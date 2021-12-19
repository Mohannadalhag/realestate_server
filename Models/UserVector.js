const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserVectorSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  vector: [
    {
      type: Number,
    },
  ],
});

const UserVector = mongoose.model("user_vectors", UserVectorSchema);

module.exports = UserVector;
