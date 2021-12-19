require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

const PriceRange = require("../../Models/PriceRange");
const allSystemPriceRanges = [
  {
    // 0 <= x < 100000
    from: 0,
    to: 100000,
    isAvailable: true,
  },
  {
    // 100000 <= x < 150000
    from: 100000,
    to: 150000,
    isAvailable: true,
  },
  {
    // 150000 <= x < 200000
    from: 150000,
    to: 200000,
    isAvailable: true,
  },
  {
    // 200000 <= x < 300000
    from: 200000,
    to: 300000,
    isAvailable: true,
  },
  {
    // 300000 <= x < 400000
    from: 300000,
    to: 400000,
    isAvailable: true,
  },
  {
    // 400000 <= x < 500000
    from: 400000,
    to: 500000,
    isAvailable: true,
  },
  {
    // 500000 <= x < 600000
    from: 500000,
    to: 600000,
    isAvailable: true,
  },
  {
    // 600000 <= x < 800000
    from: 600000,
    to: 800000,
    isAvailable: true,
  },
  {
    // 800000 <= x < 1000000
    from: 800000,
    to: 1000000,
    isAvailable: true,
  },
  {
    // 1000000 <= x < 1500000
    from: 1000000,
    to: 1500000,
    isAvailable: true,
  },
  {
    // 1500000 <= x < 2000000
    from: 1500000,
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
    // 3000000 <= x < 5000000
    from: 3000000,
    to: 5000000,
    isAvailable: true,
  },
  {
    // 5000000 <= x < 7000000
    from: 5000000,
    to: 7000000,
    isAvailable: true,
  },
  {
    // 7000000 <= x < 10000000
    from: 7000000,
    to: 10000000,
    isAvailable: true,
  },
  {
    // 10000000 <= x < 15000000
    from: 10000000,
    to: 15000000,
    isAvailable: true,
  },
  {
    // 15000000 <= x < 20000000
    from: 15000000,
    to: 20000000,
    isAvailable: true,
  },
  {
    // 20000000 <= x < 30000000
    from: 20000000,
    to: 30000000,
    isAvailable: true,
  },
  {
    // 30000000 <= x < 40000000
    from: 30000000,
    to: 40000000,
    isAvailable: true,
  },
  {
    // 40000000 <= x < 50000000
    from: 40000000,
    to: 50000000,
    isAvailable: true,
  },
  {
    // 50000000 <= x < 60000000
    from: 50000000,
    to: 60000000,
    isAvailable: true,
  },
  {
    // 60000000 <= x < 80000000
    from: 60000000,
    to: 80000000,
    isAvailable: true,
  },
  {
    // 80000000 <= x < 100000000
    from: 80000000,
    to: 100000000,
    isAvailable: true,
  },
  {
    // 100000000 <= x < 140000000
    from: 100000000,
    to: 140000000,
    isAvailable: true,
  },
  {
    // 140000000 <= x < 180000000
    from: 140000000,
    to: 180000000,
    isAvailable: true,
  },
  {
    // 180000000 <= x < 220000000
    from: 180000000,
    to: 220000000,
    isAvailable: true,
  },
  {
    // 220000000 <= x < 260000000
    from: 220000000,
    to: 260000000,
    isAvailable: true,
  },
  {
    // 260000000 <= x < 300000000
    from: 260000000,
    to: 300000000,
    isAvailable: true,
  },
  {
    // 300000000 <= x < 350000000
    from: 300000000,
    to: 350000000,
    isAvailable: true,
  },
  {
    // 350000000 <= x < 400000000
    from: 350000000,
    to: 400000000,
    isAvailable: true,
  },
  {
    // 400000000 <= x < 450000000
    from: 400000000,
    to: 450000000,
    isAvailable: true,
  },
  {
    // 450000000 <= x < 500000000
    from: 450000000,
    to: 500000000,
    isAvailable: true,
  },
  {
    // 500000000 <= x < 600000000
    from: 500000000,
    to: 600000000,
    isAvailable: true,
  },
  {
    // 600000000 <= x < 700000000
    from: 600000000,
    to: 700000000,
    isAvailable: true,
  },
  {
    // 700000000 <= x < 800000000
    from: 700000000,
    to: 800000000,
    isAvailable: true,
  },
  {
    // 800000000 <= x < 900000000
    from: 800000000,
    to: 900000000,
    isAvailable: true,
  },
  {
    // 900000000 <= x < 1000000000
    from: 900000000,
    to: 1000000000,
    isAvailable: true,
  },
  {
    // 1000000000 <= x < 10000000000
    from: 1000000000,
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
