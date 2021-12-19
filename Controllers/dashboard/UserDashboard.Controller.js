const createError = require("http-errors");
const User = require("../../Models/User");
const mongoose = require("mongoose");
const UserDashboardService = require("../../Services/dashboard/UserDashboard.Service");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../../Helpers/Response.Helper");
const SERVER_ERRORS = require("../../Helpers/ServerErrors.Helper");
const Role = require("../../Models/Role");
const Cluster = require("../../Models/Cluster");
const UserVector = require("../../Models/UserVector");
const UserBehavior = require("../../Models/UserBehavior");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const body = req.body;

      const doesExist = await User.findOne({ email: body.email });
      let newUser;
      if (doesExist) {
        if (doesExist.isVerified) {
          throw createError.Conflict({
            array_error: [
              new ErrorResponse(
                "body",
                "email",
                `${body.email} is already been registered`
              ),
            ],
            code: SERVER_ERRORS.USER_IS_ALREADY_EXIST,
          });
        } else {
          newUser = await UserDashboardService.createUserDashboard(
            req.body,
            doesExist
          );
        }
      } else {
        const user = new User();
        newUser = await UserDashboardService.createUserDashboard(
          req.body,
          user
        );
      }

      await new UserBehavior({
        userId: newUser._id,
        behaviorType: "save",
      }).save();
      await new UserBehavior({
        userId: newUser._id,
        behaviorType: "like",
      }).save();
      await new UserBehavior({
        userId: newUser._id,
        behaviorType: "view",
      }).save();

      const user_behavior_search = await new UserBehavior({
        userId: newUser._id,
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

      await newUser.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserDashboardService.getAllUsersDashboard();
      res.send(new SuccessResponse(true, { users: users }));
    } catch (error) {
      next(error);
    }
  },

  updateUserEmail: async (req, res, next) => {
    try {
      const { userId, newEmail } = req.body;
      const user = await User.findById(userId);

      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      const doesExist = await User.findOne({ email: newEmail });
      if (doesExist) {
        if (doesExist.isVerified) {
          throw createError.Conflict({
            array_error: [
              new ErrorResponse(
                "body",
                "newEmail",
                `${newEmail} is already been registered`
              ),
            ],
            code: SERVER_ERRORS.USER_IS_ALREADY_EXIST,
          });
        } else {
          await User.findOneAndDelete({ email: newEmail });
        }
      }

      user.email = newEmail;
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("body", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      console.log(error);
      next(error);
    }
  },
  updateUserPassword: async (req, res, next) => {
    try {
      const { userId, newPassword } = req.body;
      const user = await User.findById(userId);

      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      user.password = await user.hashedPassword(newPassword);
      await user.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("body", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      console.log(error);
      next(error);
    }
  },
  updateUserRole: async (req, res, next) => {
    try {
      const { userId, newRole } = req.body;
      const user = await User.findById(userId);

      if (!user)
        throw createError.NotFound({
          array_error: [
            new ErrorResponse("body", "userId", "User not registered"),
          ],
          code: SERVER_ERRORS.USER_NOT_REGISTERED,
        });

      if (newRole) {
        const role = await Role.findById(newRole);
        if (!role) {
          throw createError.NotFound({
            array_error: [
              new ErrorResponse("body", "newRole", "Role not found"),
            ],
            code: SERVER_ERRORS.ROLE_NOT_FOUND,
          });
        }
        user.role = role;
        await user.save();
      }

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [new ErrorResponse("body", "id", "Invalid id")],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      console.log(error);
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserDashboardService.getUserByIdDashboard(userId);
      res.send(new SuccessResponse(true, { user: user }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
