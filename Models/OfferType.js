const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Apartment or office or .......
const OfferTypeSchema = new Schema({
  offerTypeKey: {
    type: String,
  },
  offerTypeArabicName: {
    type: String,
  },
  offerTypeEnglishName: {
    type: String,
  },
  pk: {
    type: Number,
    default: 0,
  },
});

const OfferType = mongoose.model("offer_types", OfferTypeSchema);
module.exports = OfferType;
