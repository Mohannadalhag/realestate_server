const createError = require("http-errors");
const Offer = require("../../Models/Offer");
const mongoose = require("mongoose");
const OfferService = require("../../Services/dashboard/Dashboard.Offer.Service");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../../Helpers/Response.Helper");
const SERVER_ERRORS = require("../../Helpers/ServerErrors.Helper");

module.exports = {
  getAllOffers: async (req, res, next) => {
    try {
      const offers = await OfferService.getAllOffers();

      const filtered_offers = await OfferService.filterOfferData(offers);

      res.send(
        new SuccessResponse(true, {
          offers: filtered_offers,
        })
      );
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  getAllOffersWithPagination: async (req, res, next) => {
    try {
      let requestedPage = req.query.page;
      let offersInPage = req.query.count;

      if (!requestedPage || requestedPage <= 0) requestedPage = 1;
      if (!offersInPage) offersInPage = 5;

      console.log("requestedPage : ", requestedPage);
      console.log("offersInPage : ", offersInPage);

      const offers = await OfferService.getAllOffersByPageAndLimit(
        requestedPage,
        offersInPage
      );

      const filtered_offers = await OfferService.filterOfferData(offers);

      const offers_count = await OfferService.getOfferCount();
      console.log("offers_count : ", offers_count);

      res.send(
        new SuccessResponse(true, {
          offers: filtered_offers,
          offers_count: offers_count,
        })
      );
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  deleteAOffer: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;

      const deleted_offer = await OfferService.deleteAOffer(offerId);

      res.send(new SuccessResponse(true, { deleted_offer: deleted_offer }));
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError)
        return next(createError(400, "Invalid Offer id"));
      next(error);
    }
  },
};
