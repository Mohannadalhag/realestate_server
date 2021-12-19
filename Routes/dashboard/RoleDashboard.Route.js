const express = require("express");
const router = express.Router();
const RoleController = require("../../Controllers/dashboard/RoleDashboard.Controller");

//Get a list of all Roles
router.get("/", RoleController.getAllRoles);

module.exports = router;
