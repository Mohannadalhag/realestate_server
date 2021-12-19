const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Region = require("./Region");
const BusinessOffer = require("./BusinessOffer");
const OfferType = require("./OfferType");
const PriceRange = require("./PriceRange");
const AreaRange = require("./AreaRange");

const LogSchema = new Schema({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offers",
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
  priceRange: {
    type: PriceRange.schema,
  },
  areaRange: {
    type: AreaRange.schema,
  },
  notify_me: {
    type: Boolean,
    default: false,
  },
});

const Log = mongoose.model("logs", LogSchema);
module.exports = Log;
