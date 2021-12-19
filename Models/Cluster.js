const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserVector = require("./UserVector");

const ClusterSchema = new Schema({
  name: {
    type: String,
  },
  users: [
    {
      type: UserVector.schema,
    },
  ],
  center: [
    {
      type: Number,
    },
  ],
  liked_offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "offers",
    },
  ],
});

const Cluster = mongoose.model("clusters", ClusterSchema);

module.exports = Cluster;
