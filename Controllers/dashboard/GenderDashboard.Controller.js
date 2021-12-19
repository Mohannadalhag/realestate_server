const Gender = require("../../Models/Gender");
const { SuccessResponse } = require("../../Helpers/Response.Helper");

module.exports = {
  getAllGenders: async (req, res, next) => {
    try {
      const genders = await Gender.find({}, { __v: 0 });
      res.send(new SuccessResponse(true, { genders: genders }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
