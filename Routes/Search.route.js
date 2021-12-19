const express = require("express");
const router = express.Router();
const SearchController = require("../Controllers/Search.Controller");
// const { verifyAccessToken } = require("../helpers/jwt_helper");

const {
  verifyAuthentication,
} = require("../Middlewares/Authentication.Middleware");

// router.post("/", verifyAccessToken, SearchController.getOffers);

router.put(
  "/enable-notify",
  [verifyAuthentication],
  SearchController.setNotifyMeForThisSearch
);

module.exports = router;
