require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

const BusinessOffer = require("../../Models/BusinessOffer");
const allSystemBusinessOffers = [
  {
    BusinessOfferKey: "sale",
    BusinessOfferArabicName: "بيع",
    BusinessOfferEnglishName: "Sale",
  },
  {
    BusinessOfferKey: "rent",
    BusinessOfferArabicName: "إيجار",
    BusinessOfferEnglishName: "Rent",
  },
];

(async () => {
  try {
    let counter = 0;
    allSystemBusinessOffers.map(async (businessOffer) => {
      await new BusinessOffer({
        BusinessOfferKey: businessOffer.BusinessOfferKey,
        BusinessOfferArabicName: businessOffer.BusinessOfferArabicName,
        BusinessOfferEnglishName: businessOffer.BusinessOfferEnglishName,
        pk: counter++,
      }).save();
      console.log(counter);
    });

    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
