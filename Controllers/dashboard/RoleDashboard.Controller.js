const Role = require("../../Models/Role");
const { SuccessResponse } = require("../../Helpers/Response.Helper");

module.exports = {
  getAllRoles: async (req, res, next) => {
    try {
      const roles = await Role.find({}, { __v: 0 });
      res.send(new SuccessResponse(true, { roles: roles }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
