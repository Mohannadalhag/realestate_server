const User = require("../Models/User");
const Role = require("../Models/Role");
const Gender = require("../Models/Gender");
const Region = require("../Models/Region");
const UserBehavior = require("../Models/UserBehavior");
const Notification = require("../Models/Notification");
const { NOTIFY_TYPES } = require("../Helpers/Notification_helper");

module.exports = {
  createUser: async (requestBody, user) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          user.firstName = requestBody.firstName;
          user.lastName = requestBody.lastName;
          user.email = requestBody.email;
          user.password = await user.hashedPassword(requestBody.password);

          //Role default is user
          user.role = await Role.findOne({ roleKey: "user" });

          if (requestBody.gender)
            user.gender = await Gender.findById(requestBody.gender);
          if (requestBody.region)
            user.region = await Region.findById(requestBody.region);

          if (requestBody.birthday) user.birthday = requestBody.birthday;
          if (requestBody.photo) user.photo = requestBody.photo;
          if (requestBody.phone) user.phone = requestBody.phone;

          resolve(user);
        } catch (error) {
          console.log("createUser error : ", error);
          reject(error);
        }
      })();
    });
  },
  updateUser: async (requestBody, user) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          user.firstName = requestBody.firstName;
          user.lastName = requestBody.lastName;

          // No update email and password from here
          // I can update my role just from Dashboard

          if (requestBody.gender)
            user.gender = await Gender.findById(requestBody.gender);
          if (requestBody.region)
            user.region = await Region.findById(requestBody.region);

          if (requestBody.birthday) user.birthday = requestBody.birthday;
          if (requestBody.photo) user.photo = requestBody.photo;
          if (requestBody.phone) user.phone = requestBody.phone;

          resolve(user);
        } catch (error) {
          console.log("updateUser error : ", error);
          reject(error);
        }
      })();
    });
  },
  getUserMe: async (userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const users = await User.findById(userId, {
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
            isVerified: 0,
            isDeleted: 0,
          });
          resolve(users);
        } catch (error) {
          console.log("getUserMe error : ", error);
          reject(error);
        }
      })();
    });
  },
  getUserIdsToSendNotifyThatMatchWithNewOffer: async (new_offer) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user_behaviors = await UserBehavior.find({
            "offersLog.region._id": new_offer.region._id,
            "offersLog.offerType._id": new_offer.offerType._id,
            "offersLog.offerType._id": new_offer.offerType._id,
            "offersLog.priceRange._id": new_offer.priceRange._id,
            "offersLog.areaRange._id": new_offer.areaRange._id,
            "offersLog.areaRange._id": new_offer.areaRange._id,
            "offersLog.notify_me": true,
          });
          const user_ids = [];
          user_behaviors.map((user_behavior) => {
            user_ids.push(user_behavior.userId);
          });
          resolve(user_ids);
        } catch (error) {
          console.log("getUserIdsThatMatchWithNewOffer error : ", error);
          reject(error);
        }
      })();
    });
  },
  getFirebaseTokensForUsers: async (user_ids) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const users = await User.find({ _id: user_ids });
          const firebase_tokens = [];
          users.map((user) => {
            firebase_tokens.push(user.firebase_token);
          });
          resolve(firebase_tokens);
        } catch (error) {
          console.log("getFirebaseTokensForUsers error : ", error);
          reject(error);
        }
      })();
    });
  },
  storeNotificationForUserIds: async (
    notification_type,
    user_ids,
    offer_id
  ) => {
    switch (notification_type) {
      case NOTIFY_TYPES().NEW_SUGGESTED_OFFER: {
        user_ids.map((user_id) => {
          const notification = new Notification({
            offer_id: offer_id,
            user_id: user_id,
            notification_type: NOTIFY_TYPES().NEW_SUGGESTED_OFFER,
            title_ar: "عرض مقترح جديد",
            title_en: "new suggested offer",
            description_ar: "عرض مقترح جديد مطابق لبحثك",
            description_en: "new suggested offer may be matching your searches",
          });
          notification.save();
        });
        break;
      }
      default:
        break;
    }
  },
};
