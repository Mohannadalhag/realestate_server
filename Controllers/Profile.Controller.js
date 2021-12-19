const createError = require("http-errors");
const User = require("../Models/User");
const mongoose = require("mongoose");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");
const { generateCodeAndSendMail } = require("../Helpers/NodeMailer.Helper");
const OTP = require("../Models/OTP");
const Notification = require("../Models/Notification");
const userService = require("../Services/User.Service");
const OTPServices = require("../Services/OTP.Service");

module.exports = {
  getProfileMe: async (req, res, next) => {
    try {
      const id = req.payload.userId;

      const user = await User.findById(id);

      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      const userObject = await userService.getUserMe(user._id);
      res.send(new SuccessResponse(true, { user: userObject }));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
  updateProfileMe: async (req, res, next) => {
    try {
      const id = req.payload.userId;

      const user = await User.findById(id);

      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      await userService.updateUser(req.body, user);
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const id = req.payload.userId;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(id);
      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      // check if old password is correct
      const isMatch = await user.isValidPassword(oldPassword);
      if (!isMatch) {
        throw createError.BadRequest({
          array_error: [
            new ErrorResponse(
              "body",
              "password",
              "old password is not correct"
            ),
          ],
          code: SERVER_ERRORS.OLD_PASSWORD_IS_NOT_CORRECT,
        });
      }

      const hPassword = await user.hashedPassword(newPassword);
      user.password = hPassword;
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
  updateEmailGenerateCode: async (req, res, next) => {
    try {
      const id = req.payload.userId;
      const { newEmail, oldPassword } = req.body;

      const user = await User.findById(id);
      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      // check if old password is correct
      const isMatch = await user.isValidPassword(oldPassword);
      if (!isMatch) {
        throw createError.BadRequest({
          array_error: [
            new ErrorResponse(
              "body",
              "password",
              "old password is not correct"
            ),
          ],
          code: SERVER_ERRORS.OLD_PASSWORD_IS_NOT_CORRECT,
        });
      }

      const userEmail = await User.findOne({ email: newEmail });
      if (userEmail) {
        if (userEmail.isVerified) {
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
          await User.findOneAndDelete({ email: newEmail });
        }
      }

      generateCodeAndSendMail(newEmail, "Forget Password");

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
  updateEmailVerifyCode: async (req, res, next) => {
    try {
      const { newEmail, otpCode, oldPassword } = req.body;
      const id = req.payload.userId;
      const user = await User.findById(id);
      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      // check if old password is correct
      const isMatch = await user.isValidPassword(oldPassword);
      if (!isMatch) {
        throw createError.BadRequest({
          array_error: [
            new ErrorResponse(
              "body",
              "password",
              "old password is not correct"
            ),
          ],
          code: SERVER_ERRORS.OLD_PASSWORD_IS_NOT_CORRECT,
        });
      }

      const userEmail = await User.findOne({ email: newEmail });
      if (userEmail) {
        if (userEmail.isVerified) {
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
          await User.findOneAndDelete({ email: newEmail });
        }
      }

      const otpUser = await OTP.findOne({ email: newEmail });
      OTPServices.checkOTP(otpUser, otpCode);

      await User.findOneAndUpdate({ _id: id }, { email: newEmail });

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
  updateFirebaseToken: async (req, res, next) => {
    try {
      const { firebase_token } = req.body;
      const id = req.payload.userId;
      const user = await User.findById(id);
      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      user.firebase_token = firebase_token;
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
  getMyNotifications: async (req, res, next) => {
    try {
      const id = req.payload.userId;
      const user = await User.findById(id);
      if (!user) {
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("payload", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });
      }

      const notifications = await Notification.find({ user_id: id }).sort({
        created_at: -1,
      });

      res.send(new SuccessResponse(true, { notifications: notifications }));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("payload", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },
};
