const { body } = require("express-validator");

module.exports = {
  registerRules: () => {
    return [
      body("email")
        .exists()
        .withMessage("email must be required")
        .isEmail()
        .withMessage("email must be valid"),

      body("password")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters"),
    ];
  },
};
