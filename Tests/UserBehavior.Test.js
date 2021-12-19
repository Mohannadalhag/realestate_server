require("dotenv").config("../.env");
require("../Config/InitiateMongoDB.Config");

const UserBehavior = require("../Models/UserBehavior");
const mongoose = require("mongoose");
const allSystemUserBehaviors = [
  {
    userId: mongoose.Types.ObjectId("60b944361021a537085e8f79"),
    behaviorType: "like",
    offersLog: [
      {
        offerId: mongoose.Types.ObjectId("60bd127cee37170e18bb7ef4"),
        region: {
          _id: mongoose.Types.ObjectId("60afa466f77e2d172408bab6"),
          regionKey: "mazah",
          regionArabicName: "مزة",
          regionEnglishName: "Mazah",
          province: {
            _id: mongoose.Types.ObjectId("60afa466f77e2d172408bab4"),
            provinceKey: "damascus",
            provinceArabicName: "دمشق",
            provinceEnglishName: "Damascus",
            phoneCode: "+96311",
            __v: 0,
          },
          __v: 0,
        },
        offerType: {
          _id: mongoose.Types.ObjectId("60ba4e7f1b721b38dcc36774"),
          offerTypeKey: "Flat",
          offerTypeArabicName: "شقة",
          offerTypeEnglishName: "Flat",
          __v: 0,
        },
        businessOffer: {
          _id: mongoose.Types.ObjectId("60ba4e6d38fdcd139465f3a6"),
          BusinessOfferKey: "sale",
          BusinessOfferArabicName: "بيع",
          BusinessOfferEnglishName: "Sale",
          __v: 0,
        },
        areaRange: {
          isAvailable: true,
          _id: mongoose.Types.ObjectId("60ba5104f8b33c2e900b5193"),
          from: 100,
          to: 200,
          __v: 0,
        },
        priceRange: {
          isAvailable: true,
          _id: mongoose.Types.ObjectId("60ba510a43a4b020a0457ccd"),
          from: 1000000,
          to: 2000000,
          __v: 0,
        },
        __v: 0,
      },
    ],
  },
  {
    userId: mongoose.Types.ObjectId("60b944361021a537085e8f79"),
    behaviorType: "save",
    offersLog: [
      {
        offerId: mongoose.Types.ObjectId("60bd127cee37170e18bb7ef4"),
        region: {
          _id: mongoose.Types.ObjectId("60afa466f77e2d172408bab6"),
          regionKey: "mazah",
          regionArabicName: "مزة",
          regionEnglishName: "Mazah",
          province: {
            _id: mongoose.Types.ObjectId("60afa466f77e2d172408bab4"),
            provinceKey: "damascus",
            provinceArabicName: "دمشق",
            provinceEnglishName: "Damascus",
            phoneCode: "+96311",
            __v: 0,
          },
          __v: 0,
        },
        offerType: {
          _id: mongoose.Types.ObjectId("60ba4e7f1b721b38dcc36774"),
          offerTypeKey: "Flat",
          offerTypeArabicName: "شقة",
          offerTypeEnglishName: "Flat",
          __v: 0,
        },
        businessOffer: {
          _id: mongoose.Types.ObjectId("60ba4e6d38fdcd139465f3a6"),
          BusinessOfferKey: "sale",
          BusinessOfferArabicName: "بيع",
          BusinessOfferEnglishName: "Sale",
          __v: 0,
        },
        areaRange: {
          isAvailable: true,
          _id: mongoose.Types.ObjectId("60ba5104f8b33c2e900b5193"),
          from: 100,
          to: 200,
          __v: 0,
        },
        priceRange: {
          isAvailable: true,
          _id: mongoose.Types.ObjectId("60ba510a43a4b020a0457ccd"),
          from: 1000000,
          to: 2000000,
          __v: 0,
        },
        __v: 0,
      },
    ],
  },
];

(async () => {
  try {
    await UserBehavior.insertMany(allSystemUserBehaviors);
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
