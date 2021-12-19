const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaticValuesSchema = new Schema({
  offer_type: {
    // شقة , مكتب , مزرعة
    type: [String],
  },
  real_estate_type: {
    // حكم محكمة , طابو أخضر
    type: [String],
  },
  business_offer: {
    // اجار , بيع
    type: [String],
  },
  direction: {
    type: [String],
  },

  place: {
    province: {
      // دمشق , درعا , السويداء
      type: String,
    },

    region: {
      // الكسوة , جرمانا
      type: [String],
    },
  },

  feature: {
    type: [String],
  },
});

const StaticValues = mongoose.model("staticValues", StaticValuesSchema);
module.exports = StaticValues;
