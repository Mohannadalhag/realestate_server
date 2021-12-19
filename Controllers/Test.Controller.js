const {
  sendNewSuggestedOfferNotification,
} = require("../Helpers/Notification_helper");

module.exports = {
  sendTestNotification: async (req, res, next) => {
    try {
      await sendNewSuggestedOfferNotification(
        "asnakjnfjsdhfasfjshfjsdhjhgdjdg",
        "asjhfjanfj"
      );

      res.send(results);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
};
