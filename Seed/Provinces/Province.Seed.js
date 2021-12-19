require("dotenv").config("../../.env");
require("../../Config/InitiateMongoDB.Config");

const Province = require("../../Models/Province");
const Region = require("../../Models/Region");

// const province =   {
//   provinceKey
// provinceArabicName
// provinceEnglishName
// phoneCode
// }

// const region = {
//   regionKey
// regionArabicName
// regionEnglishName
// province
// }

const allProvinces = [
  {
    provinceKey: "damascus",
    provinceArabicName: "دمشق",
    provinceEnglishName: "Damascus",
    phoneCode: "+96311",
    regions: [
      {
        regionKey: "mazah",
        regionArabicName: "مزة",
        regionEnglishName: "Mazah",
      },
      {
        regionKey: "roken aldeen",
        regionArabicName: "ركن الدين",
        regionEnglishName: "Roken aldeen",
      },
      {
        regionKey: "kafer soseh",
        regionArabicName: "كفر سوسة",
        regionEnglishName: "Kafer soseh",
      },
    ],
  },
  {
    provinceKey: "daraa",
    provinceArabicName: "درعا",
    provinceEnglishName: "Daraa",
    phoneCode: "+96315",
    regions: [
      {
        regionKey: "daraa-city",
        regionArabicName: "درعا المدينة",
        regionEnglishName: "Daraa city",
      },
      {
        regionKey: "dael",
        regionArabicName: "داعل",
        regionEnglishName: "Dael",
      },
    ],
  },
];

const insert_provinces = async () => {
  allProvinces.map(async (province) => {
    const new_province = new Province({
      provinceKey: province.provinceKey,
      provinceArabicName: province.provinceArabicName,
      provinceEnglishName: province.provinceEnglishName,
      phoneCode: province.phoneCode,
    });

    const saved_province = await new_province.save();

    province.regions.map(async (region) => {
      const new_region = new Region({
        regionKey: region.regionKey,
        regionArabicName: region.regionArabicName,
        regionEnglishName: region.regionEnglishName,
        province: saved_province,
      });

      const saved_region = await new_region.save();
    });
  });
};

insert_provinces();
