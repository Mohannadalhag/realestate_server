const express = require("express");
const router = express.Router();
const StaticValuesController = require("../Controllers/StaticValues.Controller");

//Get a list of all StaticValues
router.get("/", StaticValuesController.getAllStaticValues);

module.exports = router;
