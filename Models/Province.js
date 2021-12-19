const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
  provinceKey: {
    type: String,
  },
  provinceArabicName: {
    type: String,
  },
  provinceEnglishName: {
    type: String,
  },
  phoneCode: {
    type: String,
  },
});

const Province = mongoose.model("provinces", ProvinceSchema);

module.exports = Province;
