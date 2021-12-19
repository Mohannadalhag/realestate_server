const express = require("express");
const router = express.Router();
const ProvinceController = require("../../Controllers/dashboard/ProvinceDashboard.Controller");

//Get a list of all provinces
router.get("/", ProvinceController.getAllProvinces);

//Get a list of all regions for province
router.get("/:provinceId", ProvinceController.getAllRegionsForProvince);

module.exports = router;
