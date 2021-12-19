const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderSchema = new Schema({
  genderKey: {
    type: String,
  },
  genderArabicName: {
    type: String,
  },
  genderEnglishName: {
    type: String,
  },
});

const Gender = mongoose.model("genders", GenderSchema);
module.exports = Gender;
