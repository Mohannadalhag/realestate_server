// offer types
//      فيلا,بيت,متجر,شقة,مكتب,قبو,أرض,مزرعة,شالية,مطعم,مستودع
// business offer
//      شراء,إجار
// area
//#region
//      أقل من 20,
//      بين الـ 20 و الـ 39,
//      بين الـ 40 و الـ 59,
//      بين الـ 60 و الـ 79,
//      بين الـ 80 و الـ 99,
//      بين الـ 100 و الـ 119,
//      بين الـ 120 و الـ 139,
//      بين الـ 140 و الـ 159,
//      بين الـ 160 و الـ 179,
//      بين الـ 180 و الـ 199,
//      بين الـ 200 و الـ 239,
//
//      بين الـ 280 و الـ 319,
//      بين الـ 320 و الـ 359,
//      بين الـ 360 و الـ 399,
//
//      بين الـ 500 و الـ 599,
//      بين الـ 600 و الـ 799,
//      بين الـ 800 و الـ 999,
//      بين الـ 1,000 و الـ 1,199,
//      بين الـ 1,200 و الـ 1,599
//
//      بين الـ 3,000 و الـ 3,999,
//
//      بين الـ 6,000 و الـ 7,999,
//      بين الـ 8,000 و الـ 9,999,
//
//      بين الـ 12,000 و الـ 15,999,
//
//      بين الـ 20,000 و الـ 100,000,
//#endregion

// price
//#region
//      أقل من 100 ألف,
//      أكبر من 100 ألف وأصغر من 150 ألف,
//      أكبر من 150 ألف وأصغر من 200 ألف,
//      أكبر من 200 ألف وأصغر من 300 ألف,
//      أكبر من 300 ألف وأصغر من 400 ألف,
//      أكبر من 400 ألف وأصغر من 500 ألف,
//      أكبر من 500 ألف وأصغر من 600 ألف,
//      أكبر من 600 ألف وأصغر من 800 ألف,
//      أكبر من 800 ألف وأصغر من مليون,
//      أكبر من مليون وأصغر من 1.5 مليون,

//      أكبر من 2 مليون وأصغر من 3 مليون,

//      أكبر من 5 مليون وأصغر من 7 مليون,
//      أكبر من 7 مليون وأصغر من 10 مليون,
//      أكبر من 10 مليون وأصغر من 15 مليون,
//      أكبر من 15 مليون وأصغر من 20 مليون,
//      أكبر من 20 مليون وأصغر من 30 مليون,

//      أكبر من 40 مليون وأصغر من 50 مليون,
//      أكبر من 50 مليون وأصغر من 60 مليون,

//      أكبر من 80 مليون وأصغر من 100 مليون,
//      أكبر من 100 مليون وأصغر من 140 مليون,
//      أكبر من 140 مليون وأصغر من 180 مليون,
//      أكبر من 180 مليون وأصغر من 220 مليون,

//      أكبر من 260 مليون وأصغر من 300 مليون,

//      أكبر من 350 مليون وأصغر من 400 مليون,
//      أكبر من 400 مليون وأصغر من 450 مليون
//      أكبر من 450 مليون وأصغر من 500 مليون,

//      أكبر من 600 مليون وأصغر من 700 مليون,
//      أكبر من 700 مليون وأصغر من 800 مليون,
//      أكبر من 800 مليون وأصغر من 900 مليون,

//      أكبر من مليار وأصغر من 10 مليار,
//#endregion

// region
//#region

//      ريف دمشق-جرمانا,
//      ريف دمشق-يبرود,
//      ريف دمشق-عين الفيجة,
//      ريف دمشق-ضاحية قدسيا,
//      ريف دمشق-الكسوة,
//      ريف دمشق-كفر بطنا,
//      ريف دمشق-دوما,
//      ريف دمشق-حرستا,
//      ريف دمشق-مضايا,
//      ريف دمشق-التل,
//      ريف دمشق-قدسيا,
//      ريف دمشق-صحنايا,
//      ريف دمشق-الزبداني,
//      ريف دمشق-النبك,
//      ريف دمشق-سرغايا,

//      دمشق-المزة,
//      دمشق-كفرسوسة,
//      دمشق-ركن الدين,
//      دمشق-برزة,
//      دمشق-دمشق القديمة,
//      دمشق-الصالحية,
//      دمشق-الشاغور,
//      دمشق-الميدان,
//      دمشق-اليرموك,
//      دمشق-المهاجرين,
//      دمشق-القصاع,
//      دمشق-القنوات
//      دمشق-دمر,

//      درعا-داعل,
//      درعا-مركز درعا,

//      اللاذقية-مركز اللاذقية,
//      اللاذقية-هنادي,
//      اللاذقية-كسب,
//      اللاذقية-جبلة,

//      السويداء-مركز السويداء,

//      حلب-مركز حلب,
//      حلب-رسم حرمل الامام,
//      حلب-سيف الدولة,

//#endregion

// Start
require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../../Models/User");

const Province = require("../../Models/Province");
const Region = require("../../Models/Region");

const OfferType = require("../../Models/OfferType");

const BusinessOffer = require("../../Models/BusinessOffer");

const PriceRange = require("../../Models/PriceRange");

const AreaRange = require("../../Models/AreaRange");

const search_data = require("./search_data");
const Gender = require("../../Models/Gender");
const Role = require("../../Models/Role");
const UserBehavior = require("../../Models/UserBehavior");
const Log = require("../../Models/Log");

const hashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);
    return hPassword;
  } catch (error) {
    console.log("hashedPassword User Model catch");
  }
};

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
  // area range
  const getAreaRange = async (area_name) => {
    let area_key = "";

    switch (area_name) {
      case "أقل من 20": {
        area_key = "0-20";
        break;
      }
      case "بين الـ 20 و الـ 39": {
        area_key = "20-40";
        break;
      }
      case "بين الـ 40 و الـ 59": {
        area_key = "40-60";
        break;
      }
      case "بين الـ 60 و الـ 79": {
        area_key = "60-80";
        break;
      }
      case "بين الـ 80 و الـ 99": {
        area_key = "80-100";
        break;
      }
      case "بين الـ 100 و الـ 119": {
        area_key = "100-120";
        break;
      }
      case "بين الـ 120 و الـ 139": {
        area_key = "120-140";
        break;
      }
      case "بين الـ 140 و الـ 159": {
        area_key = "140-160";
        break;
      }
      case "بين الـ 160 و الـ 179": {
        area_key = "160-180";
        break;
      }
      case "بين الـ 180 و الـ 199": {
        area_key = "180-200";
        break;
      }
      case "بين الـ 200 و الـ 239": {
        area_key = "200-240";
        break;
      }
      case "بين الـ 280 و الـ 319": {
        area_key = "280-320";
        break;
      }
      case "بين الـ 320 و الـ 359": {
        area_key = "320-360";
        break;
      }
      case "بين الـ 360 و الـ 399": {
        area_key = "360-400";
        break;
      }
      case "بين الـ 500 و الـ 599": {
        area_key = "500-600";
        break;
      }
      case "بين الـ 600 و الـ 799": {
        area_key = "600-800";
        break;
      }
      case "بين الـ 800 و الـ 999": {
        area_key = "800-1000";
        break;
      }
      case "بين الـ 1,000 و الـ 1,199": {
        area_key = "1000-1200";
        break;
      }
      case "بين الـ 1,200 و الـ 1,599": {
        area_key = "1200-1600";
        break;
      }
      case "بين الـ 3,000 و الـ 3,999": {
        area_key = "3000-4000";
        break;
      }
      case "بين الـ 6,000 و الـ 7,999": {
        area_key = "6000-8000";
        break;
      }
      case "بين الـ 8,000 و الـ 9,999": {
        area_key = "8000-10000";
        break;
      }
      case "بين الـ 12,000 و الـ 15,999": {
        area_key = "12000-16000";
        break;
      }
      case "بين الـ 20,000 و الـ 100,000": {
        area_key = "20000-25000";
        break;
      }
      default:
        break;
    }

    const area_range = await AreaRange.findOne({
      key: area_key,
    });
    return area_range;
  };

  // price range
  const getPriceRange = async (price_name) => {
    let price_key = "";

    switch (price_name) {
      case "أقل من 100 ألف": {
        price_key = "0-100000";
        break;
      }
      case "أكبر من 100 ألف وأصغر من 150 ألف": {
        price_key = "100000-150000";
        break;
      }
      case "أكبر من 150 ألف وأصغر من 200 ألف": {
        price_key = "150000-200000";
        break;
      }
      case "أكبر من 200 ألف وأصغر من 300 ألف": {
        price_key = "200000-300000";
        break;
      }
      case "أكبر من 300 ألف وأصغر من 400 ألف": {
        price_key = "300000-400000";
        break;
      }
      case "أكبر من 400 ألف وأصغر من 500 ألف": {
        price_key = "400000-500000";
        break;
      }
      case "أكبر من 500 ألف وأصغر من 600 ألف": {
        price_key = "500000-600000";
        break;
      }
      case "أكبر من 600 ألف وأصغر من 800 ألف": {
        price_key = "600000-800000";
        break;
      }
      case "أكبر من 800 ألف وأصغر من مليون": {
        price_key = "800000-1000000";
        break;
      }
      case "أكبر من مليون وأصغر من 1.5 مليون": {
        price_key = "1000000-1500000";
        break;
      }
      case "أكبر من 2 مليون وأصغر من 3 مليون": {
        price_key = "2000000-3000000";
        break;
      }
      case "أكبر من 5 مليون وأصغر من 7 مليون": {
        price_key = "5000000-7000000";
        break;
      }
      case "أكبر من 7 مليون وأصغر من 10 مليون": {
        price_key = "7000000-10000000";
        break;
      }
      case "أكبر من 15 مليون وأصغر من 20 مليون": {
        price_key = "15000000-20000000";
        break;
      }
      case "أكبر من 20 مليون وأصغر من 30 مليون": {
        price_key = "20000000-30000000";
        break;
      }
      case "أكبر من 40 مليون وأصغر من 50 مليون": {
        price_key = "40000000-50000000";
        break;
      }
      case "أكبر من 50 مليون وأصغر من 60 مليون": {
        price_key = "50000000-60000000";
        break;
      }
      case "أكبر من 80 مليون وأصغر من 100 مليون": {
        price_key = "80000000-100000000";
        break;
      }
      case "أكبر من 100 مليون وأصغر من 140 مليون": {
        price_key = "100000000-140000000";
        break;
      }
      case "أكبر من 140 مليون وأصغر من 180 مليون": {
        price_key = "140000000-180000000";
        break;
      }
      case "أكبر من 180 مليون وأصغر من 220 مليون": {
        price_key = "180000000-220000000";
        break;
      }
      case "أكبر من 260 مليون وأصغر من 300 مليون": {
        price_key = "260000000-300000000";
        break;
      }
      case "أكبر من 350 مليون وأصغر من 400 مليون": {
        price_key = "350000000-400000000";
        break;
      }
      case "أكبر من 400 مليون وأصغر من 450 مليون": {
        price_key = "400000000-450000000";
        break;
      }
      case "أكبر من 450 مليون وأصغر من 500 مليون": {
        price_key = "450000000-500000000";
        break;
      }
      case "أكبر من 600 مليون وأصغر من 700 مليون": {
        price_key = "600000000-700000000";
        break;
      }
      case "أكبر من 700 مليون وأصغر من 800 مليون": {
        price_key = "700000000-800000000";
        break;
      }
      case "أكبر من 800 مليون وأصغر من 900 مليون": {
        price_key = "800000000-900000000";
        break;
      }
      case "أكبر من مليار وأصغر من 10 مليار": {
        price_key = "1000000000-10000000000";
        break;
      }
      default:
        break;
    }

    const price_range = await PriceRange.findOne({
      key: price_key,
    });
    return price_range;
  };

  // Business Offer
  const getBusinessOffer = async (business_offer) => {
    let business_offer_key = "";

    switch (business_offer) {
      case "شراء": {
        business_offer_key = "sale";
        break;
      }
      case "إجار": {
        business_offer_key = "rent";
        break;
      }
      default:
        break;
    }

    const business_offer_obj = await BusinessOffer.findOne({
      BusinessOfferKey: business_offer_key,
    });
    return business_offer_obj;
  };

  //  Offer types
  const getOfferType = async (offer_type) => {
    let business_offer_ = null;

    let offer_type_key = "";

    switch (offer_type) {
      case "متجر": {
        offer_type_key = "shop";
        break;
      }
      case "أرض": {
        offer_type_key = "land";
        break;
      }
      case "قبو": {
        offer_type_key = "basement";
        break;
      }
      case "مكتب": {
        offer_type_key = "office";
        break;
      }
      case "مطعم": {
        offer_type_key = "resturant";
        break;
      }
      case "مزرعة": {
        offer_type_key = "farm";
        break;
      }
      case "شالية": {
        offer_type_key = "chalet";
        break;
      }
      case "بيت": {
        offer_type_key = "house";
        break;
      }
      case "فيلا": {
        offer_type_key = "villa";
        break;
      }
      case "شقة": {
        offer_type_key = "flat";
        break;
      }
      default: {
        break;
      }
    }

    const offer_type_obj = await OfferType.findOne({
      offerTypeKey: offer_type_key,
    });
    return offer_type_obj;
  };

  // Aria - Region
  const getOfferRegion = async (offer_region) => {
    let offer_region_key = "";

    switch (offer_region) {
      case "حلب-مركز حلب": {
        offer_region_key = "markaz-halab";
        break;
      }
      case "حلب-رسم حرمل الامام": {
        offer_region_key = "rasam-harmal-alamam";
        break;
      }
      case "حلب-سيف الدولة": {
        offer_region_key = "sayf-alduwalih";
        break;
      }
      case "ريف دمشق-قدسيا": {
        offer_region_key = "qudsiaa";
        break;
      }
      case "ريف دمشق-صحنايا": {
        offer_region_key = "sahnaya";
        break;
      }
      case "ريف دمشق-الزبداني": {
        offer_region_key = "alzubdani";
        break;
      }
      case "ريف دمشق-النبك": {
        offer_region_key = "alnabk";
        break;
      }
      case "ريف دمشق-جرمانا": {
        offer_region_key = "jirmana";
        break;
      }
      case "ريف دمشق-يبرود": {
        offer_region_key = "yabrud";
        break;
      }
      case "ريف دمشق-عين الفيجة": {
        offer_region_key = "eayn-alfayja";
        break;
      }
      case "ريف دمشق-سرغايا": {
        offer_region_key = "sirghaya";
        break;
      }
      case "ريف دمشق-ضاحية قدسيا": {
        offer_region_key = "dahiat-qudsiaa";
        break;
      }
      case "ريف دمشق-الكسوة": {
        offer_region_key = "alkaswa";
        break;
      }
      case "ريف دمشق-كفر بطنا": {
        offer_region_key = "kafar-batnana";
        break;
      }
      case "ريف دمشق-دوما": {
        offer_region_key = "dwma";
        break;
      }
      case "ريف دمشق-حرستا": {
        offer_region_key = "harasta";
        break;
      }
      case "ريف دمشق-مضايا": {
        offer_region_key = "madaya";
        break;
      }
      case "ريف دمشق-التل": {
        offer_region_key = "altall";
        break;
      }
      case "دمشق-الميدان": {
        offer_region_key = "almaydan";
        break;
      }
      case "دمشق-اليرموك": {
        offer_region_key = "alyarmuk";
        break;
      }
      case "دمشق-المهاجرين": {
        offer_region_key = "almuhajirin";
        break;
      }
      case "دمشق-القصاع": {
        offer_region_key = "alqisae";
        break;
      }
      case "دمشق-القنوات": {
        offer_region_key = "alqanawat";
        break;
      }
      case "دمشق-دمر": {
        offer_region_key = "dummr";
        break;
      }
      case "دمشق-المزة": {
        offer_region_key = "almaza";
        break;
      }
      case "دمشق-كفرسوسة": {
        offer_region_key = "kafrisusa";
        break;
      }
      case "دمشق-ركن الدين": {
        offer_region_key = "rukn-aldiyn";
        break;
      }
      case "دمشق-برزة": {
        offer_region_key = "barza";
        break;
      }
      case "دمشق-دمشق القديمة": {
        offer_region_key = "dimashq-alqadima";
        break;
      }
      case "دمشق-الصالحية": {
        offer_region_key = "alsaalihia";
        break;
      }
      case "دمشق-الشاغور": {
        offer_region_key = "alshaaghwr";
        break;
      }
      case "درعا-مركز درعا": {
        offer_region_key = "markaz-direa";
        break;
      }
      case "درعا-داعل": {
        offer_region_key = "daeil";
        break;
      }
      case "اللاذقية-مركز اللاذقية": {
        offer_region_key = "markaz-allaadhiqia";
        break;
      }
      case "اللاذقية-هنادي": {
        offer_region_key = "hunadi";
        break;
      }
      case "اللاذقية-كسب": {
        offer_region_key = "kasb";
        break;
      }
      case "اللاذقية-جبلة": {
        offer_region_key = "jabla";
        break;
      }
      case "السويداء-مركز السويداء": {
        offer_region_key = "markaz-alsuwayda";
        break;
      }

      default: {
        break;
      }
    }
    const offer_region_obj = await Region.findOne({
      regionKey: offer_region_key,
    });
    return offer_region_obj;
  };

  //   gender
  const getGender = async (gender_key) => {
    const gender = await Gender.findOne({ genderKey: gender_key });
    return gender;
  };

  //   role
  const getRole = async (role_key) => {
    const role = await Role.findOne({ roleKey: role_key });
    return role;
  };

  //   Region
  const getRegion = async (region_key) => {
    const region = await Region.findOne({ regionKey: region_key });
    return region;
  };

  for (i = 0; i < search_data.length; i++) {
    const hp = await hashedPassword(search_data[i].password);

    const gender = await getGender(search_data[i].gender);
    const role = await getRole(search_data[i].role);
    const region = await getRegion(search_data[i].region);

    const user = new User({
      firstName: search_data[i].firstName,
      lastName: search_data[i].lastName,
      email: search_data[i].email,
      password: hp,
      role: role,
      gender: gender,
      region: region,
      birthday: search_data[i].birthday,
      photo: search_data[i].photo,
      phone: search_data[i].phone,
      myOffers: [],
      isDeleted: search_data[i].isDeleted,
      isVerified: search_data[i].isVerified,
    });
    console.log("user :\n", user);

    await new UserBehavior({ userId: user._id, behaviorType: "save" }).save();
    await new UserBehavior({ userId: user._id, behaviorType: "like" }).save();
    await new UserBehavior({ userId: user._id, behaviorType: "view" }).save();

    const user_behavior = new UserBehavior({
      userId: user._id,
      behaviorType: "search",
      offersLog: [],
    });

    // save user
    for (j = 0; j < search_data[i].searches.length; j++) {
      const offer_type = await getOfferType(
        search_data[i].searches[j].offer_type
      );
      const business_offer = await getBusinessOffer(
        search_data[i].searches[j].business_offer
      );
      const region = await getOfferRegion(search_data[i].searches[j].region);
      const area_range = await getAreaRange(search_data[i].searches[j].area);
      const price_range = await getPriceRange(search_data[i].searches[j].price);

      const log = new Log({
        region: region,
        offerType: offer_type,
        businessOffer: business_offer,
        priceRange: price_range,
        areaRange: area_range,
      });
      user_behavior.offersLog.push(log);
      console.log(`user search ${j} :\n`, search_data[i].searches[j]);
    }

    await user_behavior.save();
    await user.save();
  }

  console.log("success");
};
