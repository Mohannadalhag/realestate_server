const createError = require("http-errors");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const { USER_NOT_AUTHORIZED } = require("../Helpers/ServerErrors.Helper");
const Offer = require("../Models/Offer");

module.exports = {
  userRole: async (req, res, next) => {
    try {
      const offerId = req.params.offerId;
      const userId = req.payload.userId;
      const offer = await Offer.findById(offerId);
      if (String(offer.owner) != String(userId)) {
        throw createError.Unauthorized({
          array_error: [
            new ErrorResponse(
              "headers",
              "authorization",
              "You are not authorized"
            ),
          ],
          code: USER_NOT_AUTHORIZED,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};
