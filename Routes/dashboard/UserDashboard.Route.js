const express = require("express");
const router = express.Router();
const UserController = require("../../Controllers/dashboard/UserDashboard.Controller");

router.post("/create", UserController.createUser);

router.put("/update/password", UserController.updateUserPassword);

router.put("/update/email", UserController.updateUserEmail);

router.put("/update/role", UserController.updateUserRole);

router.get("/all", UserController.getAllUsers);

router.get("/user-details/:userId", UserController.getUserById);

module.exports = router;
