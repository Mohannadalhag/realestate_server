require("dotenv").config(".env");
require("../Config/InitiateMongoDB.Config");
const UserBehavior = require("../Models/UserBehavior");
const LENGTH_BUSINESS_OFFER = 2;
const LENGTH_OFFER_TYPE = 16;
const LENGTH_AREA_RANGE = 51;
const LENGTH_PRICE_RANGE = 38;
const LENGTH_REGION = 275;
// const { ExportToCsv } = require("export-to-csv");
const ObjectsToCsv = require("objects-to-csv");

const arrayOfZerosForOneAttribute = (arr, object) => {
  arr[object.pk] = 1;
  return arr;
};

(async () => {
  try {
    let csvContent = "data:text/csv;charset=utf-8,";
    const userBehaviors = await UserBehavior.find({ behaviorType: "search" });
    const users = [];
    userBehaviors.map((userBehavior) => {
      console.log("userBehavior._id : ", userBehavior._id);
      const allSearch = [];
      userBehavior.offersLog.map((log) => {
        const arrBusinessOffer = new Array(LENGTH_BUSINESS_OFFER).fill(0);
        const arrOfferType = new Array(LENGTH_OFFER_TYPE).fill(0);
        const arrRegion = new Array(LENGTH_REGION).fill(0);
        const arrAreaRange = new Array(LENGTH_AREA_RANGE).fill(0);
        const arrPriceRange = new Array(LENGTH_PRICE_RANGE).fill(0);

        if (log?.businessOffer != null)
          arrayOfZerosForOneAttribute(arrBusinessOffer, log.businessOffer);

        if (log?.offerType != null)
          arrayOfZerosForOneAttribute(arrOfferType, log.offerType);

        if (log?.region != null)
          arrayOfZerosForOneAttribute(arrRegion, log.region);

        if (log?.areaRange != null)
          arrayOfZerosForOneAttribute(arrAreaRange, log.areaRange);

        if (log?.priceRange != null)
          arrayOfZerosForOneAttribute(arrPriceRange, log.priceRange);

        const oneSearch = arrBusinessOffer.concat(
          arrOfferType,
          arrRegion,
          arrAreaRange,
          arrPriceRange
        );
        allSearch.push(oneSearch);
      });

      const model_user = {
        id: userBehavior._id,
        vector: new Array(
          LENGTH_BUSINESS_OFFER +
            LENGTH_OFFER_TYPE +
            LENGTH_AREA_RANGE +
            LENGTH_PRICE_RANGE +
            LENGTH_REGION
        ).fill(0),
      };

      for (j = 0; j < allSearch[0].length; j++) {
        let sum = 0;
        for (i = 0; i < allSearch.length; i++) {
          sum += allSearch[i][j];
        }
        let avg = (1.0 * sum) / allSearch.length;
        model_user.vector[j] = avg;
      }

      console.dir(model_user.vector, { maxArrayLength: null });
      users.push(model_user);
    });

    var json = JSON.stringify(users);
    require("fs").writeFile("myjsonfile.json", json, "utf8", function (err) {
      if (err) throw err;
      console.log("complete");
    });

    console.log("Successfully ...");
  } catch (error) {
    console.log("error : ", error);
  }
})();
