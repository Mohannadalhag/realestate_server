const express = require("express");
const router = express.Router();
const AuthenticationController = require("../Controllers/Authentication.Controller");
const {
  verifyAuthentication,
} = require("../Middlewares/Authentication.Middleware");

const { registerRules } = require("../Validation/User.Validation");
const { validate } = require("../Validation/Index.Validation");

router.post(
  "/signup",
  registerRules(),
  validate,
  AuthenticationController.register
);

router.post("/login", AuthenticationController.login);

router.post("/logout", verifyAuthentication, AuthenticationController.logout);

router.post("/generate-otp-code", AuthenticationController.generateOtpCode);

router.post(
  "/check-code-login",
  AuthenticationController.checkVerifyCodeWithLogin
);

router.post("/check-verify-code", AuthenticationController.checkVerifyCode);

router.post("/otp-change-password", AuthenticationController.otpChangePassword);

module.exports = router;
