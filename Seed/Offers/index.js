require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");

const IKAR_HOST = "http://www.ikar.sy/";

const User = require("../../Models/User");
const Offer = require("../../Models/Offer");

const Province = require("../../Models/Province");
const Region = require("../../Models/Region");

const OfferType = require("../../Models/OfferType");

const BusinessOffer = require("../../Models/BusinessOffer");

const PriceRange = require("../../Models/PriceRange");

const AreaRange = require("../../Models/AreaRange");

const data = require("./data");

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
  // owner user
  const owner = await User.findOne({
    email: "mouhammed.almasri.cm7@gmail.com",
  });

  // area range
  const getAreaRange = async (area) => {
    const area_range = await AreaRange.findOne({
      from: { $lte: area },
      to: { $gt: area },
    });
    return area_range;
  };

  // price range
  const getPriceRange = async (price) => {
    const price_range = await PriceRange.findOne({
      from: { $lte: price },
      to: { $gt: price },
    });
    return price_range;
  };

  // Business Offer
  const getBusinessOffer = async (business_offer) => {
    let business_offer_ = null;
    if (business_offer == "بيع") {
      business_offer_ = await BusinessOffer.findOne({
        BusinessOfferKey: "sale",
      });
      return business_offer_;
    } else {
      business_offer_ = await BusinessOffer.findOne({
        BusinessOfferKey: "rent",
      });
      return business_offer_;
    }
  };

  //  Offer types
  const getOfferType = async (offer_type) => {
    let business_offer_ = null;

    switch (offer_type) {
      case "مزرعة": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "farm" });
        return business_offer_;
      }
      case "شاليه": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "chalet" });
        return business_offer_;
      }
      case "بيت": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "house" });
        return business_offer_;
      }
      case "فيلا": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "villa" });
        return business_offer_;
      }
      case "محلات تجارية": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "shop" });
        return business_offer_;
      }
      case "أراضي زراعية" ||
        "أرض للبناء" ||
        "أراضي ذات رخصة صناعية" ||
        "أراضي ذات رخصة سياحية": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "land" });

        return business_offer_;
      }
      case "شقة": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "flat" });
        return business_offer_;
      }
      case "استوديو": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "studio" });
        return business_offer_;
      }
      case "عيادة": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "clinic" });
        return business_offer_;
      }
      case "بناء كامل": {
        business_offer_ = await OfferType.findOne({
          offerTypeKey: "building",
        });
        return business_offer_;
      }
      case "منشأة تصنيع": {
        business_offer_ = await OfferType.findOne({
          offerTypeKey: "facility",
        });
        return business_offer_;
      }
      case "قبو": {
        business_offer_ = await OfferType.findOne({
          offerTypeKey: "basement",
        });
        return business_offer_;
      }
      case "مستودع": {
        business_offer_ = await OfferType.findOne({
          offerTypeKey: "warehouse",
        });
        return business_offer_;
      }
      case "صالة": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "hall" });
        return business_offer_;
      }
      case "مكتب": {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "office" });
        return business_offer_;
      }
      case "مطعم": {
        business_offer_ = await OfferType.findOne({
          offerTypeKey: "resturant",
        });
        return business_offer_;
      }
      default: {
        business_offer_ = await OfferType.findOne({ offerTypeKey: "flat" });
        return business_offer_;
      }
    }
  };

  // Aria - Region
  const getOfferRegion = async (offer_region) => {
    let offer_region_ = null;

    switch (offer_region) {
      case "عقربا": {
        offer_region_ = await Region.findOne({ regionKey: "eaqraba" });
        return offer_region_;
      }
      case "الغزلانيه": {
        offer_region_ = await Region.findOne({ regionKey: "alghuzlania" });
        return offer_region_;
      }
      case "جديده الفضل": {
        offer_region_ = await Region.findOne({
          regionKey: "jadidat-alfadl",
        });
        return offer_region_;
      }
      case "السلمية": {
        offer_region_ = await Region.findOne({ regionKey: "alsilmia" });
        return offer_region_;
      }
      case "الشيخ بدر": {
        offer_region_ = await Region.findOne({
          regionKey: "alshaykh-badr",
        });
        return offer_region_;
      }
      case "أشرفية صحنايا": {
        offer_region_ = await Region.findOne({
          regionKey: "ashrafiat-sihnaya",
        });
        return offer_region_;
      }
      case "صيدنايا": {
        offer_region_ = await Region.findOne({ regionKey: "saydanaya" });
        return offer_region_;
      }
      case "جمرايا": {
        offer_region_ = await Region.findOne({ regionKey: "jamraya" });
        return offer_region_;
      }
      case "عدرا": {
        offer_region_ = await Region.findOne({ regionKey: "adra" });
        return offer_region_;
      }
      case "بانياس": {
        offer_region_ = await Region.findOne({ regionKey: "banyas" });
        return offer_region_;
      }
      case "عربين": {
        offer_region_ = await Region.findOne({ regionKey: "eirbin" });
        return offer_region_;
      }
      case "الكسوه": {
        offer_region_ = await Region.findOne({ regionKey: "alkaswa" });
        return offer_region_;
      }
      case "ببيلا": {
        offer_region_ = await Region.findOne({ regionKey: "babila" });
        return offer_region_;
      }
      case "جبلة": {
        offer_region_ = await Region.findOne({ regionKey: "jabla" });
        return offer_region_;
      }
      case "سيف الدوله": {
        offer_region_ = await Region.findOne({
          regionKey: "sayf-alduwalih",
        });
        return offer_region_;
      }
      case "القرداحة": {
        offer_region_ = await Region.findOne({ regionKey: "alqirdaha" });
        return offer_region_;
      }
      case "الجميليه": {
        offer_region_ = await Region.findOne({ regionKey: "aljamilih" });
        return offer_region_;
      }
      case "ضاحية قدسيا": {
        offer_region_ = await Region.findOne({
          regionKey: "dahiat-qudsiaa",
        });
        return offer_region_;
      }
      case "جديده الشيباني": {
        offer_region_ = await Region.findOne({
          regionKey: "jadiduh-alshaybaniu",
        });
        return offer_region_;
      }
      case "حزه": {
        offer_region_ = await Region.findOne({ regionKey: "hazah" });
        return offer_region_;
      }
      case "جرمانا": {
        offer_region_ = await Region.findOne({ regionKey: "jirmana" });
        return offer_region_;
      }
      case "جديده عرطوز": {
        offer_region_ = await Region.findOne({
          regionKey: "jadidat-eartuz",
        });
        return offer_region_;
      }
      case "الدريكيش": {
        offer_region_ = await Region.findOne({ regionKey: "aldarikish" });
        return offer_region_;
      }
      case "مشتى الحلو": {
        offer_region_ = await Region.findOne({
          regionKey: "mashtaa-alhulw",
        });
        return offer_region_;
      }
      case "الحمدانيه": {
        offer_region_ = await Region.findOne({ regionKey: "alhamdania" });
        return offer_region_;
      }
      case "مضايا": {
        offer_region_ = await Region.findOne({ regionKey: "madaya" });
        return offer_region_;
      }
      case "صافيتا": {
        offer_region_ = await Region.findOne({ regionKey: "safita" });
        return offer_region_;
      }
      case "العزيزيه": {
        offer_region_ = await Region.findOne({ regionKey: "aleazizih" });
        return offer_region_;
      }
      case "بملكه": {
        offer_region_ = await Region.findOne({ regionKey: "bimilkih" });
        return offer_region_;
      }
      case "حمص": {
        offer_region_ = await Region.findOne({ regionKey: "markaz-hims" });
        return offer_region_;
      }
      case "الهامه": {
        offer_region_ = await Region.findOne({ regionKey: "alhama" });
        return offer_region_;
      }
      case "اشرفيه الوادي": {
        offer_region_ = await Region.findOne({
          regionKey: "ashrfih-alwadi",
        });
        return offer_region_;
      }
      case "اللاذقية": {
        offer_region_ = await Region.findOne({
          regionKey: "markaz-allaadhiqia",
        });
        return offer_region_;
      }
      case "حماة": {
        offer_region_ = await Region.findOne({ regionKey: "markaz-hamaa" });
        return offer_region_;
      }
      case "صحنايا": {
        offer_region_ = await Region.findOne({ regionKey: "sahnaya" });
        return offer_region_;
      }
      case "الجديده": {
        offer_region_ = await Region.findOne({ regionKey: "aljadida" });
        return offer_region_;
      }
      case "قدسيا": {
        offer_region_ = await Region.findOne({ regionKey: "qudsiaa" });
        return offer_region_;
      }
      case "حلب": {
        offer_region_ = await Region.findOne({ regionKey: "markaz-halab" });
        return offer_region_;
      }
      case "السويداء": {
        offer_region_ = await Region.findOne({
          regionKey: "markaz-alsuwayda",
        });
        return offer_region_;
      }
      case "مدينة دمشق": {
        offer_region_ = await Region.findOne({
          regionKey: "dimashq-alqadima",
        });
        return offer_region_;
      }
      case "طرطوس": {
        offer_region_ = await Region.findOne({
          regionKey: "markaz-tartus",
        });
        return offer_region_;
      }

      default: {
        offer_region_ = await Region.findOne({
          regionKey: "dimashq-alqadima",
        });
        return offer_region_;
      }
    }
  };

  data.map(async (offer_data) => {
    const offer_region = await getOfferRegion(offer_data.area);

    const business_offer = await getBusinessOffer(offer_data.business_offer);
    const offer_type = await getOfferType(offer_data.type);

    const area_range = await getAreaRange(offer_data.total_area);
    const price_range = await getPriceRange(offer_data.price);

    const new_offer = new Offer({
      owner: owner._id,
      description: `${offer_data.title}, ${offer_data.description}`,
      region: offer_region,
      offerType: offer_type,
      businessOffer: business_offer,
      price: offer_data.price,
      area: offer_data.total_area,
      areaRange: area_range,
      priceRange: price_range,
    });

    offer_data.url.map((image_url) => {
      new_offer.images.push(IKAR_HOST + image_url);
    });

    console.log("new_offer : \n", new_offer);

    await new_offer.save();
  });

  console.log("success");
};

console.log("data.length  : ", data.length);
