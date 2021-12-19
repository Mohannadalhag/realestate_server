const express = require("express");
const router = express.Router();
const IndexController = require("../Controllers/Index.Controller");

router.get("/build", IndexController.buildIndex);
router.get("/vector", IndexController.buildOffersVectors);
router.get("/search", IndexController.searchQuery);


module.exports = router;
