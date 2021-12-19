const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Province = require("./Province");
const Term = require("./Term");

const MergeSchema = new Schema({
  term: 
  { 
    type: Term.schema,
  },
  frequency: {
    type: Number
  }
});

const Merge = mongoose.model("merges", MergeSchema);

module.exports = Merge;
