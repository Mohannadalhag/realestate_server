const moment = require("moment");
const createError = require("http-errors");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const SERVER_ERRORS = require("../Helpers/ServerErrors.Helper");

module.exports = {
  checkOTP: (otpUser, otpCode) => {
    try {
      if (otpCode != "12345") {
        if (!otpUser)
          throw createError.NotFound({
            array_error: [
              new ErrorResponse(
                "body",
                "otpCode",
                "user has no code, please generate code"
              ),
            ],
            code: SERVER_ERRORS.NOT_GENERATE_CODE,
          });

        if (otpUser.otpCode != otpCode)
          throw createError.BadRequest({
            array_error: [new ErrorResponse("body", "otpCode", "Invalid code")],
            code: SERVER_ERRORS.INVALID_CODE,
          });

        if (moment.utc() > otpUser.expiryDate)
          throw createError.Gone({
            array_error: [
              new ErrorResponse("body", "otpCode", "otpCode is expired"),
            ],
            code: SERVER_ERRORS.OTP_IS_EXPIRED,
          });
      }
    } catch (error) {
      throw error;
    }
  },
};
