const express = require("express");
const router = express.Router();
const GenderController = require("../../Controllers/dashboard/GenderDashboard.Controller");

//Get a list of all genders
router.get("/", GenderController.getAllGenders);

module.exports = router;
