const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndexSchema = new Schema({
  term: {
    type: String,
    required: true,
  },
  N_Doc: {
    type: "number",
    required: true,
  },
  Tot_Frequency: {
    type: "number",
    required: true,
  },
  OfferList: [
    {
      offerId: { type: Schema.Types.ObjectId, ref: "offers" },
      frequency: { type: Number },
      tf_idf: { type: Number }
    },
  ]
});

const Index = mongoose.model("index", IndexSchema);
module.exports = Index;
