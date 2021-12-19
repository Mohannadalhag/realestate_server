const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ErrorResponse } = require("../Helpers/Response.Helper");
const {
  ACCESS_TOKEN_IS_NOT_FOUND,
  ACCESS_TOKEN_INVALID,
  ACCESS_TOKEN_IS_NOT_GENERATED,
} = require("../Helpers/ServerErrors.Helper");

module.exports = {
  verifyAuthentication: async (req, res, next) => {
    try {
      if (!req.headers["authorization"])
        throw createError.Unauthorized({
          array_error: [
            new ErrorResponse(
              "headers",
              "authorization",
              "Access token not found"
            ),
          ],
          code: ACCESS_TOKEN_IS_NOT_FOUND,
        });
      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];

      if (token == null)
        throw createError.Unauthorized({
          array_error: [
            new ErrorResponse(
              "headers",
              "authorization",
              `Access token not found`
            ),
          ],
          code: ACCESS_TOKEN_IS_NOT_FOUND,
        });
      const payload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.payload = payload;
      req.token = token;

      next();
    } catch (error) {
      if (
        error.name == "JsonWebTokenError" ||
        error.name == "TokenExpiredError"
      )
        return next(
          createError.NotFound({
            array_error: [
              new ErrorResponse(
                "headers",
                "authorization",
                `Access token is not Correct(Expired or invalid or ...)`
              ),
            ],
            code: ACCESS_TOKEN_INVALID,
          })
        );
      next(error);
    }
  },

  optionalVerifyAuthentication: async (req, res, next) => {
    try {
      if (!req.headers["authorization"]) {
        req.payload = null;
        req.token = null;
        return next();
      }
      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];

      if (token == null) {
        req.payload = null;
        req.token = null;
        return next();
      }
      const payload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.payload = payload;
      req.token = token;

      next();
    } catch (error) {
      if (
        error.name == "JsonWebTokenError" ||
        error.name == "TokenExpiredError"
      )
        return next(
          createError.NotFound({
            array_error: [
              new ErrorResponse(
                "headers",
                "authorization",
                `Access token is not Correct(Expired or invalid or ...)`
              ),
            ],
            code: ACCESS_TOKEN_INVALID,
          })
        );
      next(error);
    }
  },

  // create access token
  signAccessToken: (userId, role) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, role };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: process.env.EXPIRES_IN_JWT,
        issuer: process.env.ISSUER,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(
            createError.InternalServerError({
              array_error: [
                new ErrorResponse(
                  "headers",
                  "authorization",
                  `Access token is not generate`
                ),
              ],
              code: ACCESS_TOKEN_IS_NOT_GENERATED,
            })
          );
          return;
        }
        resolve(token);
      });
    });
  },
};
