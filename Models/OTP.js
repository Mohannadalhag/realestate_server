const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const createError = require("http-errors");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");

const OTPSchema = new Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  // },
  email: {
    type: String,
  },
  expiryDate: {
    type: Date,
    default: moment.utc().add(1, "hours"),
  },
  otpCode: {
    type: String,
  },
});

const OTP = mongoose.model("otp", OTPSchema);

module.exports = OTP;
