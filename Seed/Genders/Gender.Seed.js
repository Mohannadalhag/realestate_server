require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

const Gender = require("../../Models/Gender");
const allSystemGenders = [
  {
    genderKey: "male",
    genderArabicName: "ذكر",
    genderEnglishName: "Male",
  },
  {
    genderKey: "female",
    genderArabicName: "انثى",
    genderEnglishName: "Female",
  },
  {
    genderKey: "none",
    genderArabicName: "غير محدد",
    genderEnglishName: "Not Specified",
  },
];

(async () => {
  try {
    let counter = 0;
    allSystemGenders.map(async (gender) => {
      await new Gender({
        genderKey: gender.genderKey,
        genderArabicName: gender.genderArabicName,
        genderEnglishName: gender.genderEnglishName,
        pk: counter++,
      }).save();
      console.log(counter);
    });
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
