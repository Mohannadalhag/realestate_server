const createError = require("http-errors");
const Offer = require("../Models/Offer");
const mongoose = require("mongoose");
const OfferService = require("../Services/Offer.Service");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");
const OfferType = require("../Models/OfferType");
const BusinessOffer = require("../Models/BusinessOffer");
const PriceRange = require("../Models/PriceRange");
const AreaRange = require("../Models/AreaRange");
const { searchByText } = require("./Index.Controller");
const UserBehavior = require("../Models/UserBehavior");
const Cluster = require("../Models/Cluster");
const UserService = require("../Services/User.Service");
const {
  sendNewSuggestedOfferNotification,
  NOTIFY_TYPES,
} = require("../Helpers/Notification_helper");
const offersInPage = 12;
require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const IMAGES_URL = "http://" + HOST + ":" + PORT + "/images/";

module.exports = {
  createNewOffer: async (req, res, next) => {
    try {
      const offer = new Offer();
      const userId = req.payload.userId;

      const resultOffer = await OfferService.createOffer(
        req.body,
        offer,
        userId
      );

      console.log("resultOffer\n", resultOffer);
      const { _id } = await resultOffer.save();

      const user_ids =
        await UserService.getUserIdsToSendNotifyThatMatchWithNewOffer(
          resultOffer
        );
      console.log("user_ids : ", user_ids);

      await UserService.storeNotificationForUserIds(
        NOTIFY_TYPES().NEW_SUGGESTED_OFFER,
        user_ids,
        resultOffer._id
      );

      const firebase_tokens = await UserService.getFirebaseTokensForUsers(
        user_ids
      );

      sendNewSuggestedOfferNotification(firebase_tokens, resultOffer._id);

      const responseOffer = await OfferService.getOffer(_id, userId);

      res.send(new SuccessResponse(true, { offer: resultOffer }));
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [
              new ErrorResponse("payload/body", "id", "Invalid id"),
            ],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },

  updateAOffer: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;
      const userId = req.payload.userId;
      const offer = await Offer.findById(offerId);
      const resultOffer = await OfferService.createOffer(
        req.body,
        offer,
        userId
      );

      const { _id } = await resultOffer.save();

      const responseOffer = await OfferService.getOffer(_id, userId);

      res.send(new SuccessResponse(true, { offer: responseOffer }));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [
              new ErrorResponse("payload/body", "id", "Invalid id"),
            ],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      next(error);
    }
  },

  deleteAOffer: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;
      const userId = req.payload.userId;
      await Offer.findByIdAndDelete(offerId);

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError)
        return next(createError(400, "Invalid Offer id"));
      next(error);
    }
  },

  getAllOffers: async (req, res, next) => {
    try {
      let searchQuery = {};
      if (req.body.price) {
        const price = await PriceRange.findById(req.body.price);
        searchQuery.price = { $gte: price.from, $lte: price.to };
      }
      if (req.body.area) {
        const area = await AreaRange.findById(req.body.area);
        searchQuery.area = { $gte: area.from, $lte: area.to };
      }
      if (req.body.offerType) searchQuery["offerType._id"] = req.body.offerType;
      if (req.body.businessOffer)
        searchQuery["businessOffer._id"] = req.body.businessOffer;
      if (req.body.province)
        searchQuery["region.province._id"] = req.body.province;
      if (req.body.region) searchQuery["region._id"] = req.body.region;
      let requestedPage = req.query.page;
      if (requestedPage == null || requestedPage <= 0) requestedPage = 1;

      let chunk = {
        skip: offersInPage * (requestedPage - 1),
        limit: offersInPage,
      };

      let userId = null;
      if (req.payload != null) userId = req.payload.userId;

      let offers = await OfferService.getAllOffersWithPagination(
        searchQuery,
        userId,
        req.body.text ? {} : chunk
      );
      let count = await Offer.countDocuments(searchQuery);
      count = parseInt(count);
      console.log("count : ", count);
      let pageCount = Math.ceil(count / offersInPage);
      if (req.body.text) {
        offers = await searchByText(req.body.text, offers);
        pageCount = offers.length;
        pageCount = Math.ceil(pageCount / offersInPage);
        offers = offers.splice(chunk.skip, chunk.limit);
      }
      console.log("pageCount : ", pageCount);
      res.send(
        new SuccessResponse(true, { offers: offers, pageCount: pageCount })
      );
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  getPriceRanges: async (req, res, next) => {
    try {
      const priceRanges = await PriceRange.find({});
      res.send(new SuccessResponse(true, { priceRanges: priceRanges }));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  getAreaRanges: async (req, res, next) => {
    try {
      const areaRanges = await AreaRange.find({});
      res.send(new SuccessResponse(true, { areaRanges: areaRanges }));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  getAllOfferTypes: async (req, res, next) => {
    try {
      const offerTypes = await OfferType.find();

      res.send(new SuccessResponse(true, { offerTypes: offerTypes }));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  getAllBusinessOffer: async (req, res, next) => {
    try {
      const businessOffer = await BusinessOffer.find();

      res.send(new SuccessResponse(true, { businessOffer: businessOffer }));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  getOfferById: async (req, res, next) => {
    try {
      let userId = null;
      if (req.payload != null) userId = req.payload.userId;
      const offerId = req.params.offerId;

      const responseOffer = await OfferService.getOffer(offerId, userId);

      res.send(new SuccessResponse(true, { offer: responseOffer }));
    } catch (error) {
      next(error);
    }
  },

  likeOffer: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;
      const userId = req.payload.userId;

      const response = await OfferService.likeOffer(offerId, userId);

      const user_behavior = await UserBehavior.findOne({
        userId: userId,
        behaviorType: "search",
      });

      const user_cluster = await Cluster.findOne({
        "users.user_id": user_behavior._id,
      });

      if (!user_cluster.liked_offers.includes(offerId)) {
        user_cluster.liked_offers.push(offerId);
        await user_cluster.save();
      }

      res.send(
        new SuccessResponse(true, {
          isLiked: response.isLiked,
          numberOfLikes: response.numberOfLikes,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  saveOffer: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;
      const userId = req.payload.userId;

      const response = await OfferService.saveOffer(offerId, userId);

      res.send(
        new SuccessResponse(true, {
          isSaved: response.isSaved,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getMyOffers: async (req, res, next) => {
    try {
      let requestedPage = req.query.page;
      if (requestedPage == null || requestedPage <= 0) requestedPage = 1;

      let chunk = {
        skip: offersInPage * (requestedPage - 1),
        limit: offersInPage,
      };
      const userId = req.payload.userId;
      const offers = await OfferService.getMyOffers(userId, chunk);
      let count = offers.length;
      count = parseInt(count);
      console.log("count : ", count);
      let pageCount = Math.ceil(count / offersInPage);

      res.send(
        new SuccessResponse(true, { offers: offers, pageCount: pageCount })
      );
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  getSaveOffers: async (req, res, next) => {
    try {
      const userId = req.payload.userId;
      const offers = await OfferService.getSaveOffers(userId);

      res.send(new SuccessResponse(true, { offers: offers, pageCount: 1 }));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },

  UploadImage: async (req, res, next) => {
    try {
      if (!req.files) throw createError(400, "Bad Image");
      let names = [];
      await req.files.forEach((element) => {
        names.push(IMAGES_URL + element.filename);
      });
      res.send(new SuccessResponse(true, { names }));
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError")
        return next(createError(422, error.message));
      next(error);
    }
  },
  getRecommendedOffer: async (req, res, next) => {
    try {
      const userId = req.payload.userId;
      let requestedPage = req.query.page;
      if (requestedPage == null || requestedPage <= 0) requestedPage = 1;

      let chunk = {
        skip: offersInPage * (requestedPage - 1),
        limit: offersInPage,
      };

      const userBehavior = await UserBehavior.findOne({
        userId,
        behaviorType: "search",
      });

      const cluster = await Cluster.findOne({
        "users.user_id": userBehavior._id,
      });

      console.log("--------------------\n", cluster.liked_offers);

      const OffersLiked = await Offer.find(
        { _id: cluster.liked_offers },
        {},
        chunk
      ).lean();

      const savedOffers = await UserBehavior.findOne({
        userId,
        behaviorType: "save",
      });

      const likedOffers = await UserBehavior.findOne({
        userId,
        behaviorType: "like",
      });

      OffersLiked.map((offer) => {
        String(offer.owner) == String(userId)
          ? (offer.userOfferStatus = "myOffer")
          : (offer.userOfferStatus = "registered");

        offer.isLiked = false;
        likedOffers?.offersLog.map((likedOffer) => {
          if (String(offer._id) == String(likedOffer.offerId))
            offer.isLiked = true;
        });

        offer.isSaved = false;
        savedOffers?.offersLog.map((savedOffer) => {
          if (String(offer._id) == String(savedOffer.offerId))
            offer.isSaved = true;
        });
      });

      res.send(
        new SuccessResponse(true, { offers: OffersLiked, pageCount: 1 })
      );
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
