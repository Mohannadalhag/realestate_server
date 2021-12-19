const express = require("express");
const router = express.Router();
const OfferController = require("../../Controllers/dashboard/Offer.Controller");

// get all offers
router.get("/all", OfferController.getAllOffers);

//Delete an Offer by id
router.delete("/:offerId", OfferController.deleteAOffer);

module.exports = router;
