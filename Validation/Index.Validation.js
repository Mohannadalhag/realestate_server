//https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
//https://github.com/validatorjs/validator.js#validators
//https://express-validator.github.io/docs/index.html
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");

module.exports = {
  validate: (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = [];
      errors.array().map((err) =>
        extractedErrors.push({
          param: err.param,
          msg: err.msg,
          // Location of the param that generated this error.
          // It's either body, query, params, cookies or headers.
          location: err.location,
        })
      );

      throw createError.BadRequest({
        array_error: extractedErrors,
        code: SERVER_ERRORS.INVALID_ID,
      });
    } catch (error) {
      throw error;
    }
  },
};
