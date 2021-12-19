require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");
const Role = require("../../Models/Role");

const allSystemRoles = [
  {
    roleKey: "admin",
    roleEnglishName: "Admin",
    roleArabicName: "مدير الموقع",
  },
  {
    roleKey: "user",
    roleEnglishName: "User",
    roleArabicName: "مستخدم",
  },
];

(async () => {
  try {
    await Role.insertMany(allSystemRoles);
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
