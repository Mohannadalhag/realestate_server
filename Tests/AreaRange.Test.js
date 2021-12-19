require("dotenv").config("../.env");
require("../Config/InitiateMongoDB.Config");

const AreaRange = require("../Models/AreaRange");
const allSystemAreaRanges = [
  {
    // 0 <= x < 100
    from: 0,
    to: 100,
    isAvailable: true,
  },
  {
    // 100 <= x < 200
    from: 100,
    to: 200,
    isAvailable: true,
  },
  {
    // 200 <= x < 300
    from: 200,
    to: 300,
    isAvailable: true,
  },
  {
    // 300 <= x < 400
    from: 300,
    to: 400,
    isAvailable: true,
  },
  {
    // 400 <= x < 500
    from: 400,
    to: 500,
    isAvailable: true,
  },
  {
    // 500 <= x < 1000000
    from: 500,
    to: 1000000,
    isAvailable: true,
  },
];

(async () => {
  try {
    await AreaRange.insertMany(allSystemAreaRanges);
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
