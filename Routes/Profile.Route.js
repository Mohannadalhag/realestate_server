const express = require("express");
const router = express.Router();
const ProfileController = require("../Controllers/Profile.Controller");
const {
  verifyAuthentication,
} = require("../Middlewares/Authentication.Middleware");

// const UserControllerDashboard = require("../Controllers/dashboard/User.Controller");

//Get Profile me
router.get("/profile-me", verifyAuthentication, ProfileController.getProfileMe);

//Update Profile me
router.put(
  "/profile-me",
  verifyAuthentication,
  ProfileController.updateProfileMe
);

//Update Password
router.put("/password", verifyAuthentication, ProfileController.updatePassword);

//Update Email info
router.put(
  "/email/email-generate-code",
  verifyAuthentication,
  ProfileController.updateEmailGenerateCode
);

//Update Email
router.put(
  "/email/email-verify",
  verifyAuthentication,
  ProfileController.updateEmailVerifyCode
);

//Update firebase token
router.put(
  "/refresh-firebase-token",
  verifyAuthentication,
  ProfileController.updateFirebaseToken
);

//Update user notification history
router.get(
  "/get-my-notifications",
  verifyAuthentication,
  ProfileController.getMyNotifications
);

module.exports = router;
