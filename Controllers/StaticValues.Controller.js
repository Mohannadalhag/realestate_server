const StaticValues = require("../Models/StaticValues.model");

module.exports = {
  getAllStaticValues: async (req, res, next) => {
    try {
      const results = await StaticValues.find();
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
