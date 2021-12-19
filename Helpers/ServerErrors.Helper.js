const SERVER_ERRORS = {
  //---------------------------------------------
  //Authentication Errors Start from 1000 t0 1999
  //---------------------------------------------
  USER_IS_ALREADY_EXIST: 1000,

  USER_NOT_REGISTERED: 1001,

  USER_IS_NOT_VERIFY: 1002,

  NOT_GENERATE_CODE: 1003,

  INVALID_CODE: 1004,

  OTP_IS_EXPIRED: 1005,

  INVALID_PASSWORD: 1006,

  ACCESS_TOKEN_IS_NOT_FOUND: 1007,

  ACCESS_TOKEN_INVALID: 1008, // invalid or expired

  ACCESS_TOKEN_IS_NOT_GENERATED: 1009,

  ERROR_IN_HASH_PASSWORD: 1010,

  ERROR_IN_COMPARE_PASSWORD: 1011,

  PASSWORD_AND_CONFIRM_PASSWORD_NOT_CORRECT: 1012,

  DO_NOT_SEND_MESSAGE: 1013,

  OLD_PASSWORD_IS_NOT_CORRECT: 1014,

  ROLE_NOT_FOUND: 1015,

  USER_NOT_AUTHORIZED: 1016,

  //---------------------------------------------
  // Users Errors Start from 2000 t0 2999
  //---------------------------------------------
  USER_IS_DELETED: 2000,

  //---------------------------------------------
  // Offers Errors Start from 3000 t0 3999
  //---------------------------------------------
  REGION_NOT_FOUND: 3000,
  OFFER_TYPE_NOT_FOUND: 3001,
  BUSINESS_OFFER_NOT_FOUND: 3002,
  AREA_RANGE_NOT_FOUND: 3003,
  PRICE_RANGE_NOT_FOUND: 3004,
  OFFER_NOT_FOUND: 3005,
  //---------------------------------------------
  // Invalid Id (Mongodb id)
  INVALID_ID: 11000,

  //---------------------------------------------
  //Link does not found
  LINK_NOT_FOUND: 12000,
};

module.exports = SERVER_ERRORS;
