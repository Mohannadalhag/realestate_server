const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Rent or sell
const BusinessOfferSchema = new Schema({
  BusinessOfferKey: {
    type: String,
  },
  BusinessOfferArabicName: {
    type: String,
  },
  BusinessOfferEnglishName: {
    type: String,
  },
  pk: {
    type: Number,
    default: 0,
  },
});

const BusinessOffer = mongoose.model("business_offers", BusinessOfferSchema);
module.exports = BusinessOffer;
