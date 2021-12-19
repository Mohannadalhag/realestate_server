const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const HistorySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  history: {
    province: {
      // دمشق , درعا , السويداء
      type: String,
    },
    region: {
      // الكسوة , جرمانا
      type: String,
    },
    offer_type: {
      // شقة , مكتب , مزرعة
      type: String,
    },
    business_offer: {
      // اجار , بيع
      type: String,
    },
    price: {
      // السعر سواء أكان اجار او بيع
      type: Number,
    },
    total_area: {
      type: Number,
    },
    floorNumber: {
      type: Number,
    },
    features: {
      garage: { type: Boolean }, // كراج
      parking: { type: Boolean }, // موقف
      furniture: { type: Boolean }, // مفروش
      lift: { type: Boolean }, // مصعد
    },
    notification: { type: Boolean },
    created_at: {
      type: Date,
      default: moment.utc(),
    },
  },
});

const History = mongoose.model("history", HistorySchema);
module.exports = History;
