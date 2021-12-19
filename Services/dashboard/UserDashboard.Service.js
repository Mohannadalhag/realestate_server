const User = require("../../Models/User");
const Role = require("../../Models/Role");
const Gender = require("../../Models/Gender");
const Region = require("../../Models/Region");

module.exports = {
  createUserDashboard: async (requestBody, user) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          user.firstName = requestBody.firstName;
          user.lastName = requestBody.lastName;
          user.email = requestBody.email;
          user.password = await user.hashedPassword(requestBody.password);

          if (requestBody.role)
            user.role = await Role.findById(requestBody.role);
          if (requestBody.gender)
            user.gender = await Gender.findById(requestBody.gender);
          if (requestBody.region)
            user.region = await Region.findById(requestBody.region);

          if (requestBody.birthday) user.birthday = requestBody.birthday;
          if (requestBody.photo) user.photo = requestBody.photo;
          if (requestBody.phone) user.phone = requestBody.phone;

          user.isVerified = true;

          resolve(user);
        } catch (error) {
          console.log("createUserDashboard error : ", error);
          reject(error);
        }
      })();
    });
  },
  getAllUsersDashboard: async () => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const users = await User.find(
            { isDeleted: false },
            {
              __v: 0,
              myOffers: 0,
              isDeleted: 0,
              password: 0,
              "role._id": 0,
              "role.__v": 0,
              "gender._id": 0,
              "gender.__v": 0,
              "region._id": 0,
              "region.__v": 0,
              "region.province._id": 0,
              "region.province.__v": 0,
            }
          );

          resolve(users);
        } catch (error) {
          console.log("getAllUsersDashboard error : ", error);
          reject(error);
        }
      })();
    });
  },
  getUserByIdDashboard: async (id) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user = await User.findOne(
            { isDeleted: false, _id: id },
            {
              __v: 0,
              myOffers: 0,
              isDeleted: 0,
              password: 0,
              "role._id": 0,
              "role.__v": 0,
              "gender._id": 0,
              "gender.__v": 0,
              "region._id": 0,
              "region.__v": 0,
              "region.province._id": 0,
              "region.province.__v": 0,
            }
          );

          resolve(user);
        } catch (error) {
          console.log("getUserByIdDashboard error : ", error);
          reject(error);
        }
      })();
    });
  },
};
