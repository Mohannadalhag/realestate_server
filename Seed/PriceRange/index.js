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
    insert_price_ranges();
  })
  .catch((err) => console.log(err.message));

const PriceRange = require("../../Models/PriceRange");
const allSystemPriceRanges = [
  {
    // 0 <= x < 100000
    from: 0,
    to: 100000,
    key: "0-100000",
    isAvailable: true,
  },
  {
    // 100000 <= x < 150000
    from: 100000,
    to: 150000,
    key: "100000-150000",
    isAvailable: true,
  },
  {
    // 150000 <= x < 200000
    from: 150000,
    to: 200000,
    key: "150000-200000",
    isAvailable: true,
  },
  {
    // 200000 <= x < 300000
    from: 200000,
    to: 300000,
    key: "200000-300000",
    isAvailable: true,
  },
  {
    // 300000 <= x < 400000
    from: 300000,
    to: 400000,
    key: "300000-400000",
    isAvailable: true,
  },
  {
    // 400000 <= x < 500000
    from: 400000,
    to: 500000,
    key: "400000-500000",
    isAvailable: true,
  },
  {
    // 500000 <= x < 600000
    from: 500000,
    to: 600000,
    key: "500000-600000",
    isAvailable: true,
  },
  {
    // 600000 <= x < 800000
    from: 600000,
    to: 800000,
    key: "600000-800000",
    isAvailable: true,
  },
  {
    // 800000 <= x < 1000000
    from: 800000,
    to: 1000000,
    key: "800000-1000000",
    isAvailable: true,
  },
  {
    // 1000000 <= x < 1500000
    from: 1000000,
    to: 1500000,
    key: "1000000-1500000",
    isAvailable: true,
  },
  {
    // 1500000 <= x < 2000000
    from: 1500000,
    to: 2000000,
    key: "1500000-2000000",
    isAvailable: true,
  },
  {
    // 2000000 <= x < 3000000
    from: 2000000,
    to: 3000000,
    key: "2000000-3000000",
    isAvailable: true,
  },
  {
    // 3000000 <= x < 5000000
    from: 3000000,
    to: 5000000,
    key: "3000000-5000000",
    isAvailable: true,
  },
  {
    // 5000000 <= x < 7000000
    from: 5000000,
    to: 7000000,
    key: "5000000-7000000",
    isAvailable: true,
  },
  {
    // 7000000 <= x < 10000000
    from: 7000000,
    to: 10000000,
    key: "7000000-10000000",
    isAvailable: true,
  },
  {
    // 10000000 <= x < 15000000
    from: 10000000,
    to: 15000000,
    key: "10000000-15000000",
    isAvailable: true,
  },
  {
    // 15000000 <= x < 20000000
    from: 15000000,
    to: 20000000,
    key: "15000000-20000000",
    isAvailable: true,
  },
  {
    // 20000000 <= x < 30000000
    from: 20000000,
    to: 30000000,
    key: "20000000-30000000",
    isAvailable: true,
  },
  {
    // 30000000 <= x < 40000000
    from: 30000000,
    to: 40000000,
    key: "30000000-40000000",
    isAvailable: true,
  },
  {
    // 40000000 <= x < 50000000
    from: 40000000,
    to: 50000000,
    key: "40000000-50000000",
    isAvailable: true,
  },
  {
    // 50000000 <= x < 60000000
    from: 50000000,
    to: 60000000,
    key: "50000000-60000000",
    isAvailable: true,
  },
  {
    // 60000000 <= x < 80000000
    from: 60000000,
    to: 80000000,
    key: "60000000-80000000",
    isAvailable: true,
  },
  {
    // 80000000 <= x < 100000000
    from: 80000000,
    to: 100000000,
    key: "80000000-100000000",
    isAvailable: true,
  },
  {
    // 100000000 <= x < 140000000
    from: 100000000,
    to: 140000000,
    key: "100000000-140000000",
    isAvailable: true,
  },
  {
    // 140000000 <= x < 180000000
    from: 140000000,
    to: 180000000,
    key: "140000000-180000000",
    isAvailable: true,
  },
  {
    // 180000000 <= x < 220000000
    from: 180000000,
    to: 220000000,
    key: "180000000-220000000",
    isAvailable: true,
  },
  {
    // 220000000 <= x < 260000000
    from: 220000000,
    to: 260000000,
    key: "220000000-260000000",
    isAvailable: true,
  },
  {
    // 260000000 <= x < 300000000
    from: 260000000,
    to: 300000000,
    key: "260000000-300000000",
    isAvailable: true,
  },
  {
    // 300000000 <= x < 350000000
    from: 300000000,
    to: 350000000,
    key: "300000000-350000000",
    isAvailable: true,
  },
  {
    // 350000000 <= x < 400000000
    from: 350000000,
    to: 400000000,
    key: "350000000-400000000",
    isAvailable: true,
  },
  {
    // 400000000 <= x < 450000000
    from: 400000000,
    to: 450000000,
    key: "400000000-450000000",
    isAvailable: true,
  },
  {
    // 450000000 <= x < 500000000
    from: 450000000,
    to: 500000000,
    key: "450000000-500000000",
    isAvailable: true,
  },
  {
    // 500000000 <= x < 600000000
    from: 500000000,
    to: 600000000,
    key: "500000000-600000000",
    isAvailable: true,
  },
  {
    // 600000000 <= x < 700000000
    from: 600000000,
    to: 700000000,
    key: "600000000-700000000",
    isAvailable: true,
  },
  {
    // 700000000 <= x < 800000000
    from: 700000000,
    to: 800000000,
    key: "700000000-800000000",
    isAvailable: true,
  },
  {
    // 800000000 <= x < 900000000
    from: 800000000,
    to: 900000000,
    key: "800000000-900000000",
    isAvailable: true,
  },
  {
    // 900000000 <= x < 1000000000
    from: 900000000,
    to: 1000000000,
    key: "900000000-1000000000",
    isAvailable: true,
  },
  {
    // 1000000000 <= x < 10000000000
    from: 1000000000,
    to: 10000000000,
    key: "1000000000-10000000000",
    isAvailable: true,
  },
];

const insert_price_ranges = async () => {
  try {
    let counter = 0;
    allSystemPriceRanges.map(async (priceRange) => {
      await new PriceRange({
        from: priceRange.from,
        to: priceRange.to,
        key: priceRange.key,
        isAvailable: priceRange.isAvailable,
        pk: counter++,
      }).save();
    });
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
};
