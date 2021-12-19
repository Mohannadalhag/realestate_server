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
    insert_area_ranges();
  })
  .catch((err) => console.log(err.message));

const AreaRange = require("../../Models/AreaRange");
const allSystemAreaRanges = [
  {
    // 0 <= x < 20
    from: 0,
    to: 20,
    key: "0-20",
    isAvailable: true,
  },
  {
    // 20 <= x < 40
    from: 20,
    to: 40,
    key: "20-40",
    isAvailable: true,
  },
  {
    // 40 <= x < 60
    from: 40,
    to: 60,
    key: "40-60",
    isAvailable: true,
  },
  {
    // 60 <= x < 80
    from: 60,
    to: 80,
    key: "60-80",
    isAvailable: true,
  },
  {
    // 80 <= x < 100
    from: 80,
    to: 100,
    key: "80-100",
    isAvailable: true,
  },
  {
    // 100 <= x < 120
    from: 100,
    to: 120,
    key: "100-120",
    isAvailable: true,
  },
  {
    // 120 <= x < 140
    from: 120,
    to: 140,
    key: "120-140",
    isAvailable: true,
  },
  {
    // 140 <= x < 160
    from: 140,
    to: 160,
    key: "140-160",
    isAvailable: true,
  },
  {
    // 160 <= x < 180
    from: 160,
    to: 180,
    key: "160-180",
    isAvailable: true,
  },
  {
    // 180 <= x < 200
    from: 180,
    to: 200,
    key: "180-200",
    isAvailable: true,
  },
  {
    // 200 <= x < 240
    from: 200,
    to: 240,
    key: "200-240",
    isAvailable: true,
  },
  {
    // 240 <= x < 280
    from: 240,
    to: 280,
    key: "240-280",
    isAvailable: true,
  },
  {
    // 280 <= x < 320
    from: 280,
    to: 320,
    key: "280-320",
    isAvailable: true,
  },
  {
    // 320 <= x < 360
    from: 320,
    to: 360,
    key: "320-360",
    isAvailable: true,
  },
  {
    // 360 <= x < 400
    from: 360,
    to: 400,
    key: "360-400",
    isAvailable: true,
  },
  {
    // 400 <= x < 500
    from: 400,
    to: 500,
    key: "400-500",
    isAvailable: true,
  },
  {
    // 500 <= x < 600
    from: 500,
    to: 600,
    key: "500-600",
    isAvailable: true,
  },
  {
    // 600 <= x < 800
    from: 600,
    to: 800,
    key: "600-800",
    isAvailable: true,
  },
  {
    // 800 <= x < 1000
    from: 800,
    to: 1000,
    key: "800-1000",
    isAvailable: true,
  },
  {
    // 1000 <= x < 1200
    from: 1000,
    to: 1200,
    key: "1000-1200",
    isAvailable: true,
  },
  {
    // 1200 <= x < 1600
    from: 1200,
    to: 1600,
    key: "1200-1600",
    isAvailable: true,
  },
  {
    // 1600 <= x < 2000
    from: 1600,
    to: 2000,
    key: "1600-2000",
    isAvailable: true,
  },
  {
    // 2000 <= x < 3000
    from: 2000,
    to: 3000,
    key: "2000-3000",
    isAvailable: true,
  },
  {
    // 3000 <= x < 4000
    from: 3000,
    to: 4000,
    key: "3000-4000",
    isAvailable: true,
  },
  {
    // 4000 <= x < 5000
    from: 4000,
    to: 5000,
    key: "4000-5000",
    isAvailable: true,
  },
  {
    // 5000 <= x < 6000
    from: 5000,
    to: 6000,
    key: "5000-6000",
    isAvailable: true,
  },
  {
    // 6000 <= x < 8000
    from: 6000,
    to: 8000,
    key: "6000-8000",
    isAvailable: true,
  },
  {
    // 8000 <= x < 10000
    from: 8000,
    to: 10000,
    key: "8000-10000",
    isAvailable: true,
  },
  {
    // 10000 <= x < 12000
    from: 10000,
    to: 12000,
    key: "10000-12000",
    isAvailable: true,
  },
  {
    // 12000 <= x < 16000
    from: 12000,
    to: 16000,
    key: "12000-16000",
    isAvailable: true,
  },
  {
    // 16000 <= x < 20000
    from: 16000,
    to: 20000,
    key: "16000-20000",
    isAvailable: true,
  },
  {
    // 20000 <= x < 25000
    from: 20000,
    to: 25000,
    key: "20000-25000",
    isAvailable: true,
  },
  {
    // 25000 <= x < 30000
    from: 25000,
    to: 30000,
    key: "25000-30000",
    isAvailable: true,
  },
  {
    // 30000 <= x < 35000
    from: 30000,
    to: 35000,
    key: "30000-35000",
    isAvailable: true,
  },
  {
    // 35000 <= x < 40000
    from: 35000,
    to: 40000,
    key: "35000-40000",
    isAvailable: true,
  },
  {
    // 40000 <= x < 45000
    from: 40000,
    to: 45000,
    key: "40000-45000",
    isAvailable: true,
  },
  {
    // 45000 <= x < 50000
    from: 45000,
    to: 50000,
    key: "45000-50000",
    isAvailable: true,
  },
  {
    // 50000 <= x < 60000
    from: 50000,
    to: 60000,
    key: "50000-60000",
    isAvailable: true,
  },
  {
    // 60000 <= x < 70000
    from: 60000,
    to: 70000,
    key: "60000-70000",
    isAvailable: true,
  },
  {
    // 70000 <= x < 80000
    from: 70000,
    to: 80000,
    key: "70000-80000",
    isAvailable: true,
  },
  {
    // 80000 <= x < 90000
    from: 80000,
    to: 90000,
    key: "80000-90000",
    isAvailable: true,
  },
  {
    // 90000 <= x < 100000
    from: 90000,
    to: 100000,
    key: "90000-100000",
    isAvailable: true,
  },
  {
    // 100000 <= x < 125000
    from: 100000,
    to: 125000,
    key: "100000-125000",
    isAvailable: true,
  },
  {
    // 125000 <= x < 150000
    from: 125000,
    to: 150000,
    key: "125000-150000",
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
    // 200000 <= x < 250000
    from: 200000,
    to: 250000,
    key: "200000-250000",
    isAvailable: true,
  },
  {
    // 250000 <= x < 300000
    from: 250000,
    to: 300000,
    key: "250000-300000",
    isAvailable: true,
  },
  {
    // 300000 <= x < 350000
    from: 300000,
    to: 350000,
    key: "300000-350000",
    isAvailable: true,
  },
  {
    // 350000 <= x < 400000
    from: 350000,
    to: 400000,
    key: "350000-400000",
    isAvailable: true,
  },
  {
    // 400000 <= x < 450000
    from: 400000,
    to: 450000,
    key: "400000-450000",
    isAvailable: true,
  },
  {
    // 450000 <= x < 500000
    from: 450000,
    to: 500000,
    key: "450000-500000",
    isAvailable: true,
  },
];

const insert_area_ranges = async () => {
  try {
    let counter = 0;
    allSystemAreaRanges.map(async (area_range) => {
      await new AreaRange({
        from: area_range.from,
        to: area_range.to,
        key: area_range.key,
        isAvailable: area_range.isAvailable,
        pk: counter++,
      }).save();
      console.log(counter);
    });
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
};
