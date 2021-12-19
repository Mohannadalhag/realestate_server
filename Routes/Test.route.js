const express = require("express");
const router = express.Router();
const TestController = require("../Controllers/Test.Controller");

//Get a list of all KeyWords
router.get("/send-test-notify", TestController.sendTestNotification);

module.exports = router;
