require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const OfferType = require("../../Models/OfferType");
const allSystemOfferTypes = [
  {
    offerTypeKey: "house",
    offerTypeArabicName: "بيت",
    offerTypeEnglishName: "House",
  },
  {
    offerTypeKey: "flat",
    offerTypeArabicName: "شقة",
    offerTypeEnglishName: "Flat",
  },
  {
    offerTypeKey: "chalet",
    offerTypeArabicName: "شاليه",
    offerTypeEnglishName: "Chalet",
  },
  {
    offerTypeKey: "villa",
    offerTypeArabicName: "فيلا",
    offerTypeEnglishName: "Villa",
  },
  {
    offerTypeKey: "basement",
    offerTypeArabicName: "قبو",
    offerTypeEnglishName: "Basement",
  },
  {
    offerTypeKey: "office",
    offerTypeArabicName: "مكتب",
    offerTypeEnglishName: "Office",
  },
  {
    offerTypeKey: "shop",
    offerTypeArabicName: "محل",
    offerTypeEnglishName: "Shop",
  },
  {
    offerTypeKey: "farm",
    offerTypeArabicName: "مزرعة",
    offerTypeEnglishName: "Farm",
  },
  {
    offerTypeKey: "warehouse",
    offerTypeArabicName: "مستودع",
    offerTypeEnglishName: "Warehouse",
  },
  {
    offerTypeKey: "land",
    offerTypeArabicName: "أرض",
    offerTypeEnglishName: "Land",
  },
  {
    offerTypeKey: "resturant",
    offerTypeArabicName: "مطعم",
    offerTypeEnglishName: "Resturant",
  },
  {
    offerTypeKey: "hall",
    offerTypeArabicName: "صالة",
    offerTypeEnglishName: "Hall",
  },
  {
    offerTypeKey: "facility",
    offerTypeArabicName: "منشأة تصنيع",
    offerTypeEnglishName: "Manufacturing Facility",
  },
  {
    offerTypeKey: "building",
    offerTypeArabicName: "بناء",
    offerTypeEnglishName: "Building",
  },
  {
    offerTypeKey: "clinic",
    offerTypeArabicName: "عيادة",
    offerTypeEnglishName: "Clinic",
  },
  {
    offerTypeKey: "studio",
    offerTypeArabicName: "استوديو",
    offerTypeEnglishName: "Studio",
  },
];

const dbConnect = mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected.");
    insert_data();

    console.log("finish");
  })
  .catch((err) => console.log(err.message));

const insert_data = async () => {
  let counter = 0;
  allSystemOfferTypes.map(async (offer_type) => {
    await new OfferType({
      offerTypeKey: offer_type.offerTypeKey,
      offerTypeArabicName: offer_type.offerTypeArabicName,
      offerTypeEnglishName: offer_type.offerTypeEnglishName,
      pk: counter++,
    }).save();
  });
};
