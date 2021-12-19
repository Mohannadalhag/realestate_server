const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StopWordsSchema = new Schema({
  word: {
    type: String,
  },
});

const StopWords = mongoose.model("stopWords", StopWordsSchema);
module.exports = StopWords;
