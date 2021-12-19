const KeyWords = require("../Models/KeyWords.model");

module.exports = {
  getAllKeyWords: async (req, res, next) => {
    try {
      const results = await KeyWords.find();
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
