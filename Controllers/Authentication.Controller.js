const createError = require("http-errors");
const User = require("../Models/User");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");
const { signAccessToken } = require("../Middlewares/Authentication.Middleware");
const { generateCodeAndSendMail } = require("../Helpers/NodeMailer.Helper");
const OTP = require("../Models/OTP");
const userService = require("../Services/User.Service");
const OTPServices = require("../Services/OTP.Service");
const UserBehavior = require("../Models/UserBehavior");
const Cluster = require("../Models/Cluster");
const UserVector = require("../Models/UserVector");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email } = req.body;

      const doesExist = await User.findOne({ email });
      let newUser;

      if (doesExist) {
        if (doesExist.isVerified) {
          throw createError.Conflict({
            array_error: [
              new ErrorResponse(
                "body",
                "email",
                `${email} is already been registered`
              ),
            ],
            code: SERVER_ERRORS.USER_IS_ALREADY_EXIST,
          });
        } else {
          newUser = await userService.createUser(req.body, doesExist);
        }
      } else {
        const user = new User();
        newUser = await userService.createUser(req.body, user);
      }

      const result = await newUser.save();
      const userObject = await userService.getUserMe(result._id);

      generateCodeAndSendMail(result.email, "Check Code");

      res.send(new SuccessResponse(true, { user: userObject }));
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // find if this email registered before in DB
      const user = await User.findOne({ email });

      // if user not registered before
      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "email", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      // if user deleted
      if (user.isDeleted)
        throw createError.Gone({
          array_error: [
            new ErrorResponse("body", "isDeleted", `User is deleted`),
          ],
          code: SERVER_ERRORS.USER_IS_DELETED,
        });

      // if user not verified
      if (!user.isVerified) {
        generateCodeAndSendMail(email, "Check Code");
        throw createError.Forbidden({
          array_error: [
            new ErrorResponse("body", "isVerified", `User is not verified`),
          ],
          code: SERVER_ERRORS.USER_IS_NOT_VERIFY,
        });
      }

      // if password is right
      const isMatch = await user.isValidPassword(password);
      if (!isMatch)
        throw createError.Forbidden({
          array_error: [
            new ErrorResponse("body", "password", `Email/Password not valid`),
          ],
          code: SERVER_ERRORS.INVALID_PASSWORD,
        });

      const { _id, role } = user;

      const jwtToken = await signAccessToken(_id, role);
      const userObject = await userService.getUserMe(user._id);

      res.send(
        new SuccessResponse(true, {
          accessToken: jwtToken,
          user: userObject,
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      console.log("userId : ", req.payload.userId);
      console.log("role   : ", req.payload.role);
      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      next(error);
    }
  },
  checkVerifyCodeWithLogin: async (req, res, next) => {
    try {
      const { email, otpCode } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "email", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      const otpUser = await OTP.findOne({ email });
      OTPServices.checkOTP(otpUser, otpCode);

      user.isVerified = true;
      const { _id, role } = await user.save();

      const userMe = await userService.getUserMe(_id);
      const jwtToken = await signAccessToken(_id, role);

      await new UserBehavior({ userId: _id, behaviorType: "save" }).save();
      await new UserBehavior({ userId: _id, behaviorType: "like" }).save();
      await new UserBehavior({ userId: _id, behaviorType: "view" }).save();
      const user_behavior_search = await new UserBehavior({
        userId: _id,
        behaviorType: "search",
      }).save();

      const vector = new Array(382).fill(0);

      const clusters = await Cluster.find({});

      const index = Math.floor(Math.random() * (clusters.length - 1));
      console.log("index : ", index);

      const cluster = clusters[index];

      console.log("cluster.id : ", cluster._id);

      const user_vector = new UserVector({
        user_id: user_behavior_search._id,
        vector: vector,
      });

      cluster.users.push(user_vector);
      await cluster.save();

      await res.send(
        new SuccessResponse(true, { accessToken: jwtToken, user: userMe })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  generateOtpCode: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "email", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      // if user deleted
      if (user.isDeleted)
        throw createError.Gone({
          array_error: [
            new ErrorResponse("body", "isDeleted", "User is deleted"),
          ],
          code: SERVER_ERRORS.USER_IS_DELETED,
        });

      generateCodeAndSendMail(user.email, "Check Code");
      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      next(error);
    }
  },
  checkVerifyCode: async (req, res, next) => {
    try {
      const { email, otpCode } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "email", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      const otpUser = await OTP.findOne({ email });
      OTPServices.checkOTP(otpUser, otpCode);

      user.isVerified = true;
      await user.save();
      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  otpChangePassword: async (req, res, next) => {
    try {
      const { email, otpCode, newPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "user", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      const otpUser = await OTP.findOne({ email });
      OTPServices.checkOTP(otpUser, otpCode);

      const hashNewPassword = await user.hashedPassword(newPassword);

      user.isVerified = true;
      user.password = hashNewPassword;
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
