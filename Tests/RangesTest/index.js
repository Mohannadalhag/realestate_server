require("dotenv").config(".env");
require("../../Config/InitiateMongoDB.Config");
const fs = require("fs");
const IkarTestData = require("./IkarTestData");

// Read JSON files
const data = JSON.parse(fs.readFileSync(`./Data/data10.json`, "utf-8"));

// Import into DB
// (async () => {
//   try {
//     const arrayOfObjects = [];
//     data.map((d) => {
//       const object = {};
//       object.title = d.title;
//       object.description = d.description;
//       object.city = d.city;
//       object.area_place = d.area;
//       object.street = d.street;
//       object.province = d.province;
//       object.url = d.url;
//       object.offerType = d.type;
//       object.businessOffer = d.business_offer;
//       if (!isNaN(d.price)) object.price = Number(d.price);
//       if (!isNaN(d.total_area)) object.area = Number(d.total_area);
//       arrayOfObjects.push(object);
//     });
//     await IkarTestData.insertMany(arrayOfObjects);
//     console.log("Successfully ...");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//   }
// })();

(async () => {
  try {
    const dataModel = await IkarTestData.find();
    const priceArray = [];
    const areaArray = [];

    dataModel.map((d) => {
      priceArray.push(d.price);
      areaArray.push(d.area);
    });
    priceArray.sort((a, b) => a - b);
    areaArray.sort((a, b) => a - b);
    console.dir(priceArray, { maxArrayLength: null });
    //console.log(areaArray);
    console.log("Successfully ...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
