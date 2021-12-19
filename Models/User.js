const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const {
  ERROR_IN_HASH_PASSWORD,
  ERROR_IN_COMPARE_PASSWORD,
} = require("../Helpers/ServerErrors.Helper");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const createError = require("http-errors");
const Region = require("./Region");
const Role = require("./Role");
const Gender = require("./Gender");
const moment = require("moment");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Role.schema,
  },
  gender: {
    type: Gender.schema,
  },
  region: {
    type: Region.schema,
  },
  birthday: {
    type: Date,
  },
  photo: {
    type: String,
  },
  firebase_token: {
    type: String,
  },
  phone: [
    {
      type: String,
    },
  ],
  myOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "offers",
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment.utc(),
  },
});

UserSchema.methods.hashedPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);
    return hPassword;
  } catch (error) {
    console.log("hashedPassword User Model catch");
    throw createError.Forbidden({
      array_error: [
        new ErrorResponse("User.Model", "body", "Error in hashed password"),
      ],
      code: ERROR_IN_HASH_PASSWORD,
    });
  }
};

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createError.Forbidden({
      array_error: [
        new ErrorResponse("User.Model", "body", "Error in compare password"),
      ],
      code: ERROR_IN_COMPARE_PASSWORD,
    });
  }
};

const User = mongoose.model("users", UserSchema);
module.exports = User;
