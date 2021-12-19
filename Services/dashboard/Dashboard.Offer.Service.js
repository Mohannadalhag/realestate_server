const createError = require("http-errors");
const { ErrorResponse } = require("../../Helpers/Response.Helper");
const SERVER_ERRORS = require("../../Helpers/ServerErrors.Helper");
const Offer = require("../../Models/Offer");

module.exports = {
  getAllOffers: async () => {
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
          )
            .populate({ path: "owner", select: ["firstName", "lastName"] })
            .sort({ createdAt: -1 });

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },
  getAllOffersByPageAndLimit: async (page, limit) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          let chunk = {
            skip: limit * (page - 1),
            limit: Number(limit),
          };

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
            },
            chunk
          )
            .populate({ path: "owner", select: ["firstName", "lastName"] })
            .sort({ createdAt: -1 });

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },
  deleteAOffer: async (offerId) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deleted_offer = await Offer.findByIdAndDelete(offerId);
          if (!deleted_offer) {
            reject(
              createError.NotFound({
                array_error: [
                  new ErrorResponse("params", "Offer", "Offer not found"),
                ],
                code: SERVER_ERRORS.OFFER_NOT_FOUND,
              })
            );
          }

          resolve(deleted_offer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  },
  filterOfferData: async (offers) => {
    const filtered_offers = [];
    for (index = 0; index < offers.length; index++) {
      const offer = {
        numberOfLikes: offers[index].numberOfLikes,
        createdAt: offers[index].createdAt,
        image: offers[index].images[0],
        _id: offers[index]._id,
        owner_full_name: `${offers[index].owner.firstName} ${offers[index].owner.lastName}`,
        description: offers[index].description,
        regionArabicName: offers[index].region.regionArabicName,
        regionEnglishName: offers[index].region.regionEnglishName,
        provinceArabicName: offers[index].region.province.provinceArabicName,
        provinceEnglishName: offers[index].region.province.provinceEnglishName,
        offerTypeArabicName: offers[index].offerType.offerTypeArabicName,
        offerTypeEnglishName: offers[index].offerType.offerTypeEnglishName,
        BusinessOfferArabicName:
          offers[index].businessOffer.BusinessOfferArabicName,
        BusinessOfferEnglishName:
          offers[index].businessOffer.BusinessOfferEnglishName,
        price: offers[index].price,
        area: offers[index].area,
      };

      filtered_offers.push(offer);
    }
    return filtered_offers;
  },

  getOfferCount: async () => {
    const offer_count = await Offer.countDocuments();

    return offer_count;
  },
};
