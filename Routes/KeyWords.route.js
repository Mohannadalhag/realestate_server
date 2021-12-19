const express = require("express");
const router = express.Router();
const KeyWordsController = require("../Controllers/KeyWords.Controller");

//Get a list of all KeyWords
router.get("/", KeyWordsController.getAllKeyWords);

module.exports = router;
