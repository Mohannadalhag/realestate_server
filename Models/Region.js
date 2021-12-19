const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Province = require("./Province");

const RegionSchema = new Schema({
  regionKey: {
    type: String,
  },
  regionArabicName: {
    type: String,
  },
  regionEnglishName: {
    type: String,
  },
  province: {
    type: Province.schema,
  },
  pk: {
    type: Number,
    default: 0,
  },
});

const Region = mongoose.model("regions", RegionSchema);

module.exports = Region;
