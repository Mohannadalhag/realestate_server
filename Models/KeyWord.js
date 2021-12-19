const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeyWordsSchema = new Schema({
  keywords: {
    type: [String],
    required: true,
  },
});

const KeyWords = mongoose.model("keyWords", KeyWordsSchema);
module.exports = KeyWords;
