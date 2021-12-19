const createError = require("http-errors");
const Province = require("../../Models/Province");
const Region = require("../../Models/Region");
const mongoose = require("mongoose");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../../Helpers/Response.Helper");
const SERVER_ERRORS = require("../../Helpers/ServerErrors.Helper");

module.exports = {
  getAllProvinces: async (req, res, next) => {
    try {
      const provinces = await Province.find({}, { __v: 0 });
      res.send(new SuccessResponse(true, { provinces: provinces }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllRegionsForProvince: async (req, res, next) => {
    try {
      const { provinceId } = req.params;
      const regions = await Region.find(
        { "province._id": provinceId },
        { __v: 0, "province.__v": 0 }
      );
      res.send(new SuccessResponse(true, { regions: regions }));
    } catch (error) {
      if (error instanceof mongoose.CastError)
        return next(
          createError.BadRequest({
            array_error: [
              new ErrorResponse("params", "provinceId", "Invalid id"),
            ],
            code: SERVER_ERRORS.INVALID_ID,
          })
        );
      console.log(error);
      next(error);
    }
  },
};
