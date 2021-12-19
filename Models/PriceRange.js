const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceRangeSchema = new Schema({
  from: {
    type: Number,
  },
  to: {
    type: Number,
  },
  key: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  pk: {
    type: Number,
    default: 0,
  },
});

const PriceRange = mongoose.model("price_ranges", PriceRangeSchema);
module.exports = PriceRange;
