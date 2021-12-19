require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

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
];

(async () => {
  try {
    await OfferType.insertMany(allSystemOfferTypes);
    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
