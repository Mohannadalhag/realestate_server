// require("dotenv").config("../../.env");
// require("../../Config/InitiateMongoDB.Config");

const Province = require("../../Models/Province");
const Region = require("../../Models/Region");

const allProvinces = require("./allProvinces");

const insert_provinces = async () => {
  let counter = 0;
  allProvinces.map(async (province) => {
    const new_province = new Province({
      provinceKey: province.provinceKey,
      provinceArabicName: province.provinceArabicName,
      provinceEnglishName: province.provinceEnglishName,
      phoneCode: province.phoneCode,
    });

    const saved_province = await new_province.save();

    province.regions.map(async (region) => {
      await new Region({
        regionKey: region.regionKey,
        regionArabicName: region.regionArabicName,
        regionEnglishName: region.regionEnglishName,
        province: saved_province,
        pk: counter++,
      }).save();
    });
  });
};

const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend_server_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected.");
    insert_provinces();
  })
  .catch((err) => console.log(err.message));
