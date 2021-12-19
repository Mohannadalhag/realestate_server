const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleKey: {
    type: String,
  },
  roleEnglishName: {
    type: String,
  },
  roleArabicName: {
    type: String,
  },
});

const Role = mongoose.model("roles", RoleSchema);

module.exports = Role;
