const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Log = require("./Log");

const UserBehaviorSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  behaviorType: {
    type: String,
    enum: ["save", "like", "search", "view"],
  },
  offersLog: [
    {
      type: Log.schema,
    },
  ],
});

const UserBehavior = mongoose.model("user_behaviors", UserBehaviorSchema);
module.exports = UserBehavior;
