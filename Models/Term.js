const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TermSchema = new Schema({
  offerId: 
  { 
    type: String,
  },
  term: {
    type: String,
  }
});

const Term = mongoose.model("terms", TermSchema);
module.exports = Term;
