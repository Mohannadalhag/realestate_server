const express = require("express");
const router = express.Router();
const multer = require("multer");
const OfferController = require("../Controllers/Offer.Controller");
const {
  verifyAuthentication,
  optionalVerifyAuthentication,
} = require("../Middlewares/Authentication.Middleware");

const { userRole } = require("../Middlewares/Authorization.Middleware");

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//add photo
router.post(
  "/uploadimage",
  upload.array("images"),
  OfferController.UploadImage
);

//Like an Offer by id
router.put("/like/:offerId", verifyAuthentication, OfferController.likeOffer);

//save an Offer by id
router.put("/save/:offerId", verifyAuthentication, OfferController.saveOffer);

//Get my Offers
router.get("/my-offers", verifyAuthentication, OfferController.getMyOffers);

//Get save Offers
router.get("/save-offers", verifyAuthentication, OfferController.getSaveOffers);

//Get a list of all Offers
router.get("/all", optionalVerifyAuthentication, OfferController.getAllOffers);

//Get a search list of all Offers
router.post("/search", optionalVerifyAuthentication, OfferController.getAllOffers);

//Get a list of all Offers
router.get(
  "/priceRanges",
  optionalVerifyAuthentication,
  OfferController.getPriceRanges
);

//Get a list of all Offers
router.get(
  "/areaRanges",
  optionalVerifyAuthentication,
  OfferController.getAreaRanges
);

router.get("/offerType", OfferController.getAllOfferTypes);
router.get("/businessOffer", OfferController.getAllBusinessOffer);

router.get(
  "/recommended",
  verifyAuthentication,
  OfferController.getRecommendedOffer
);

//Get a Offer by id
router.get(
  "/:offerId",
  optionalVerifyAuthentication,
  OfferController.getOfferById
);

//Create a new Offer
router.post("/create", verifyAuthentication, OfferController.createNewOffer);

//Update an Offer by id
router.put(
  "/:offerId",
  [verifyAuthentication, userRole],
  OfferController.updateAOffer
);

//Delete an Offer by id
router.delete(
  "/:offerId",
  [verifyAuthentication, userRole],
  OfferController.deleteAOffer
);

//Get save Offers

module.exports = router;
