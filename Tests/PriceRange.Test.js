require("dotenv").config("../.env");
require("../Config/InitiateMongoDB.Config");

const PriceRange = require("../Models/PriceRange");
const allSystemPriceRanges = [
  {
    // 0 <= x < 1000000
    from: 0,
    to: 1000000,
    isAvailable: true,
  },
  {
    // 1000000 <= x < 2000000
    from: 1000000,
    to: 2000000,
    isAvailable: true,
  },
  {
    // 2000000 <= x < 3000000
    from: 2000000,
    to: 3000000,
    isAvailable: true,
  },
  {
    // 3000000 <= x < 4000000
    from: 3000000,
    to: 4000000,
    isAvailable: true,
  },
  {
    // 4000000 <= x < 5000000
    from: 4000000,
    to: 5000000,
    isAvailable: true,
  },
  {
    // 5000000 <= x < 10000000000
    from: 5000000,
    to: 10000000000,
    isAvailable: true,
  },
];

(async () => {
  try {
    await PriceRange.insertMany(allSystemPriceRanges);
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
