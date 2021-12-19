const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IkarTestDataSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  city: {
    type: String,
  },
  area_place: {
    type: String,
  },
  street: {
    type: String,
  },
  province: {
    type: String,
  },
  url: [
    {
      type: String,
    },
  ],
  offerType: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  businessOffer: {
    type: String,
  },
  area: {
    // total area
    type: Number,
    default: 0,
  },
});

const IkarTestData = mongoose.model("ikar_test_data", IkarTestDataSchema);
module.exports = IkarTestData;
