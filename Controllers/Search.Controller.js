const createError = require("http-errors");
const mongoose = require("mongoose");
const Offer = require("../Models/Offer");
const User = require("../Models/User");
const History = require("../Models/History");
const UserBehavior = require("../Models/UserBehavior");
const { SuccessResponse } = require("../Helpers/Response.Helper");

module.exports = {
  getOffers: async (req, res, next) => {
    try {
      let user = await User.findById(req.payload.aud);
      //console.log(req.payload.aud);
      const results = await Offer.find(req.body);
      const history = new History({ owner: user._id, history: req.body });
      await history.save();
      console.log("history" + history);
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  // I will consider the search to be activated as the most recent => with last index in log
  setNotifyMeForThisSearch: async (req, res, next) => {
    try {
      const userId = req.payload.userId;
      const user_behavior = await UserBehavior.findOne({
        behaviorType: "search",
        userId: userId,
      });

      // get the search log and enable it
      const length = user_behavior.offersLog.length;
      const search_log = user_behavior.offersLog[length - 1];
      search_log.notify_me = true;

      await user_behavior.save();

      res.send(new SuccessResponse(true, {}));
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
