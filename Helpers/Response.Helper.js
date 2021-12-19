module.exports = {
  SuccessResponse: function (success, result) {
    this.success = success;
    this.error = null;
    this.result = result;
  },
  ErrorResponse: function (location, param, message) {
    this.location = location;
    this.param = param;
    this.msg = message;
  },
};

/*
  Examples:
  
  // Success
  {
      "success": true,
      "error": null,
      "result": {
          "user_id": 1515
      }
  }
  // Success
  {
      "success": true,
      "error": null,
      "result": {
          "user": {
          }
      }
  }
  // Error
  {
    "success": false,
    "error": {
        "status": 400, // http status  code
        "server_status": 101, // first encountered error
        "elements": [
            {
                "code": 101,
              "location": "email", // parameter name
              "location_type": "header", // "body", "header", "parameter"
              "message": "email form is not An Email"
            }
        ]
    }
  }
  
  */
