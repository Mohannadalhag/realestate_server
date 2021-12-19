const Region = require("../Models/Region");
const OfferType = require("../Models/OfferType");
const BusinessOffer = require("../Models/BusinessOffer");
const PriceRange = require("../Models/PriceRange");
const AreaRange = require("../Models/AreaRange");
const createError = require("http-errors");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");
const Offer = require("../Models/Offer");
const UserBehavior = require("../Models/UserBehavior");

module.exports = {
  createOffer: async (requestBody, offer, userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          offer.description = requestBody.description;
          offer.price = requestBody.price;
          offer.area = requestBody.area;
          offer.owner = userId;
          offer.images = requestBody.images;
          const tempRegion = await Region.findById(requestBody.region);
          if (!tempRegion) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse("body", "region", "region not found"),
                ],
                code: SERVER_ERRORS.REGION_NOT_FOUND,
              })
            );
          } else offer.region = tempRegion;

          const tempOfferType = await OfferType.findById(requestBody.offerType);
          if (!tempOfferType) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse("body", "offerType", "offerType not found"),
                ],
                code: SERVER_ERRORS.OFFER_TYPE_NOT_FOUND,
              })
            );
          } else offer.offerType = tempOfferType;

          const tempBusinessOffer = await BusinessOffer.findById(
            requestBody.businessOffer
          );
          if (!tempBusinessOffer) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse(
                    "body",
                    "businessOffer",
                    "businessOffer not found"
                  ),
                ],
                code: SERVER_ERRORS.BUSINESS_OFFER_NOT_FOUND,
              })
            );
          } else offer.businessOffer = tempBusinessOffer;

          const tempAreaRange = await AreaRange.findOne({
            to: { $gt: offer.area },
            from: { $lte: offer.area },
          });
          if (!tempAreaRange) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse("body", "areaRange", "areaRange not found"),
                ],
                code: SERVER_ERRORS.AREA_RANGE_NOT_FOUND,
              })
            );
          } else offer.areaRange = tempAreaRange;

          const tempPriceRange = await PriceRange.findOne({
            to: { $gt: offer.price },
            from: { $lte: offer.price },
          });
          if (!tempPriceRange) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse(
                    "body",
                    "priceRange",
                    "areaRange not found"
                  ),
                ],
                code: SERVER_ERRORS.PRICE_RANGE_NOT_FOUND,
              })
            );
          } else offer.priceRange = tempPriceRange;

          resolve(offer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },
 /* getAllOffers: async (userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offers = await Offer.find(
            {},
            {
              "region._id": 0,
              "region.__v": 0,
              "region.province._id": 0,
              "region.province.__v": 0,
              "offerType._id": 0,
              "offerType.__v": 0,
              "businessOffer._id": 0,
              "businessOffer.__v": 0,
              areaRange: 0,
              priceRange: 0,
              __v: 0,
            }
          ).lean();

          if (userId) {
            const savedOffers = await UserBehavior.findOne({
              userId,
              behaviorType: "save",
            });

            const likedOffers = await UserBehavior.findOne({
              userId,
              behaviorType: "like",
            });

            offers.map((offer) => {
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
          } else {
            offers.map((offer) => {
              offer.userOfferStatus = "notRegistered";
            });
          }

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },*/

  getAllOffersWithPagination: async (searchQuery, userId , chunk) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offers = await Offer.find(
            searchQuery,
            {
              "region._id": 0,
              "region.__v": 0,
              "region.province._id": 0,
              "region.province.__v": 0,
              "offerType._id": 0,
              "offerType.__v": 0,
              "businessOffer._id": 0,
              "businessOffer.__v": 0,
              areaRange: 0,
              priceRange: 0,
              __v: 0,
            },
            chunk
          ).sort({created_at : -1}).lean();

          if (userId) {
            const savedOffers = await UserBehavior.findOne({
              userId,
              behaviorType: "save",
            });

            const likedOffers = await UserBehavior.findOne({
              userId,
              behaviorType: "like",
            });

            offers.map((offer) => {
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
          } else {
            offers.map((offer) => {
              offer.userOfferStatus = "notRegistered";
            });
          }

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },

  getOffer: async (offerId, userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offer = await Offer.findById(offerId, {
            "region.__v": 0,
            "region.province.__v": 0,
            "offerType.__v": 0,
            "businessOffer.__v": 0,
            areaRange: 0,
            priceRange: 0,
            __v: 0,
          }).lean();

          if (offer) {
            offer.userOfferStatus = "notRegistered";
            if (userId) {
              offer.userOfferStatus = "registered";
              if (String(offer.owner) == String(userId))
                offer.userOfferStatus = "myOffer";

              const savedOffers = await UserBehavior.findOne({
                userId,
                behaviorType: "save",
                "offersLog.offerId": offerId,
              });
              offer.isSaved = false;
              if (savedOffers) offer.isSaved = true;

              const likedOffers = await UserBehavior.findOne({
                userId,
                behaviorType: "like",
                "offersLog.offerId": offerId,
              });
              offer.isLiked = false;
              if (likedOffers) offer.isLiked = true;
            }
          }
          resolve(offer);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  },

  getMyOffers: async (userId, chunk) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offers = await Offer.find(
            { owner: userId },
            {
              "region._id": 0,
              "region.__v": 0,
              "region.province._id": 0,
              "region.province.__v": 0,
              "offerType._id": 0,
              "offerType.__v": 0,
              "businessOffer._id": 0,
              "businessOffer.__v": 0,
              areaRange: 0,
              priceRange: 0,
              __v: 0,
            }, chunk
          ).lean();

          const savedOffers = await UserBehavior.findOne({
            userId,
            behaviorType: "save",
          });

          const likedOffers = await UserBehavior.findOne({
            userId,
            behaviorType: "like",
          });

          offers.map((offer) => {
            String(offer.owner) == String(userId)
              ? (offer.userOfferStatus = "myOffer")
              : (offer.userOfferStatus = "registered");

            offer.isLiked = false;
            likedOffers.offersLog.map((likedOffer) => {
              if (String(offer._id) == String(likedOffer.offerId))
                offer.isLiked = true;
            });

            offer.isSaved = false;
            savedOffers.offersLog.map((savedOffer) => {
              if (String(offer._id) == String(savedOffer.offerId))
                offer.isSaved = true;
            });
          });

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },

  getSaveOffers: async (userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const savedOffers = await UserBehavior.findOne({
            userId,
            behaviorType: "save",
          });

          const response = [];
          await Promise.all(
            savedOffers.offersLog.map(async (offer) => {
              const temp = await module.exports.getOffer(offer.offerId, userId);
              if (temp) response.push(temp);
            })
          );

          resolve(response);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },

  likeOffer: async (offerId, userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offer = await Offer.findById(offerId);
          let isLiked;
          const likedOffers = await UserBehavior.findOne({
            userId,
            behaviorType: "like",
            "offersLog.offerId": offerId,
          });
          if (likedOffers) {
            isLiked = false;
            if (offer.numberOfLikes != 0) {
              offer.numberOfLikes--;
              await offer.save();
            }
            await UserBehavior.findByIdAndUpdate(likedOffers._id, {
              $pull: {
                offersLog: { offerId: offerId },
              },
            });
          } else {
            isLiked = true;
            offer.numberOfLikes++;
            await offer.save();
            await UserBehavior.findOneAndUpdate(
              {
                userId,
                behaviorType: "like",
              },
              {
                $push: {
                  offersLog: {
                    offerId: offerId,
                    region: offer.region,
                    offerType: offer.offerType,
                    businessOffer: offer.businessOffer,
                    priceRange: offer.priceRange,
                    areaRange: offer.areaRange,
                  },
                },
              }
            );
          }

          resolve({ isLiked: isLiked, numberOfLikes: offer.numberOfLikes });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  },

  saveOffer: async (offerId, userId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const offer = await Offer.findById(offerId);
          let isSaved;
          const savedOffers = await UserBehavior.findOne({
            userId,
            behaviorType: "save",
            "offersLog.offerId": offerId,
          });
          if (savedOffers) {
            isSaved = false;
            await UserBehavior.findByIdAndUpdate(savedOffers._id, {
              $pull: {
                offersLog: { offerId: offerId },
              },
            });
          } else {
            isSaved = true;
            await UserBehavior.findOneAndUpdate(
              {
                userId,
                behaviorType: "save",
              },
              {
                $push: {
                  offersLog: {
                    offerId: offerId,
                    region: offer.region,
                    offerType: offer.offerType,
                    businessOffer: offer.businessOffer,
                    priceRange: offer.priceRange,
                    areaRange: offer.areaRange,
                  },
                },
              }
            );
          }

          resolve({ isSaved: isSaved });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  },
};
