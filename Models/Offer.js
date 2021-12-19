const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Region = require("./Region");
const BusinessOffer = require("./BusinessOffer");
const OfferType = require("./OfferType");
const PriceRange = require("./PriceRange");
const AreaRange = require("./AreaRange");
const moment = require("moment");

const OfferSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  description: {
    type: String,
  },
  region: {
    // alkiswa , garamana
    type: Region.schema,
  },
  offerType: {
    // Apartment or office or .......
    type: OfferType.schema,
  },
  businessOffer: {
    // Rent or sell
    type: BusinessOffer.schema,
  },
  price: {
    type: Number,
  },
  priceRange: {
    type: PriceRange.schema,
  },
  area: {
    // total area
    type: Number,
  },
  areaRange: {
    type: AreaRange.schema,
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: moment.utc(),
  },
  images: [
    {
      type: String,
    },
  ],
});

const Offer = mongoose.model("offers", OfferSchema);
module.exports = Offer;
