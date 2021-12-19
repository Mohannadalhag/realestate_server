const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require("moment");
const currDate = () => {
  return function () {
    return moment.utc();
  };
};

const NotificationSchema = new Schema({
  offer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "offers",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  notification_type: {
    type: String,
  },
  title_ar: {
    type: String,
  },
  title_en: {
    type: String,
  },
  description_ar: {
    type: String,
  },
  description_en: {
    type: String,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

const Notification = mongoose.model("notifications", NotificationSchema);

module.exports = Notification;
