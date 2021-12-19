const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VectorSchema = new Schema({
  offerId: 
  { 
    type: Schema.Types.ObjectId, 
    ref: "offers" 
  },
  TermList: [
    {
      term: {
        type: String,
      },
      tf_idf: { type: Number }
    },
  ]
});

const Vector = mongoose.model("vector", VectorSchema);
module.exports = Vector;
