const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaRangeSchema = new Schema({
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

const AreaRange = mongoose.model("area_ranges", AreaRangeSchema);
module.exports = AreaRange;
