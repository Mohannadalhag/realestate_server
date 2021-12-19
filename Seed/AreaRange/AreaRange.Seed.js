require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

const AreaRange = require("../../Models/AreaRange");
const allSystemAreaRanges = [
  {
    // 0 <= x < 20
    from: 0,
    to: 20,
    isAvailable: true,
  },
  {
    // 20 <= x < 40
    from: 20,
    to: 40,
    isAvailable: true,
  },
  {
    // 40 <= x < 60
    from: 40,
    to: 60,
    isAvailable: true,
  },
  {
    // 60 <= x < 80
    from: 60,
    to: 80,
    isAvailable: true,
  },
  {
    // 80 <= x < 100
    from: 80,
    to: 100,
    isAvailable: true,
  },
  {
    // 100 <= x < 120
    from: 100,
    to: 120,
    isAvailable: true,
  },
  {
    // 120 <= x < 140
    from: 120,
    to: 140,
    isAvailable: true,
  },
  {
    // 140 <= x < 160
    from: 140,
    to: 160,
    isAvailable: true,
  },
  {
    // 160 <= x < 180
    from: 160,
    to: 180,
    isAvailable: true,
  },
  {
    // 180 <= x < 200
    from: 180,
    to: 200,
    isAvailable: true,
  },
  {
    // 200 <= x < 240
    from: 200,
    to: 240,
    isAvailable: true,
  },
  {
    // 240 <= x < 280
    from: 240,
    to: 280,
    isAvailable: true,
  },
  {
    // 280 <= x < 340
    from: 280,
    to: 340,
    isAvailable: true,
  },
  {
    // 340 <= x < 400
    from: 340,
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
    // 500 <= x < 600
    from: 500,
    to: 600,
    isAvailable: true,
  },
  {
    // 600 <= x < 700
    from: 600,
    to: 700,
    isAvailable: true,
  },
  {
    // 700 <= x < 800
    from: 700,
    to: 800,
    isAvailable: true,
  },
  {
    // 800 <= x < 1000
    from: 800,
    to: 1000,
    isAvailable: true,
  },
  {
    // 1000 <= x < 1200
    from: 1000,
    to: 1200,
    isAvailable: true,
  },
  {
    // 1200 <= x < 1600
    from: 1200,
    to: 1600,
    isAvailable: true,
  },
  {
    // 1600 <= x < 2000
    from: 1600,
    to: 2000,
    isAvailable: true,
  },
  {
    // 2000 <= x < 3000
    from: 2000,
    to: 3000,
    isAvailable: true,
  },
  {
    // 3000 <= x < 4000
    from: 3000,
    to: 4000,
    isAvailable: true,
  },
  {
    // 4000 <= x < 5000
    from: 4000,
    to: 5000,
    isAvailable: true,
  },
  {
    // 5000 <= x < 6000
    from: 5000,
    to: 6000,
    isAvailable: true,
  },
  {
    // 6000 <= x < 8000
    from: 6000,
    to: 8000,
    isAvailable: true,
  },
  {
    // 8000 <= x < 10000
    from: 8000,
    to: 10000,
    isAvailable: true,
  },
  {
    // 10000 <= x < 12000
    from: 10000,
    to: 12000,
    isAvailable: true,
  },
  {
    // 12000 <= x < 16000
    from: 12000,
    to: 16000,
    isAvailable: true,
  },
  {
    // 16000 <= x < 20000
    from: 16000,
    to: 20000,
    isAvailable: true,
  },
  {
    // 20000 <= x < 100000
    from: 20000,
    to: 100000,
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
