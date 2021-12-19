const admin = require("../Config/firebase/init_firebase");

module.exports = {
  NOTIFY_TYPES: () => {
    return {
      NEW_SUGGESTED_OFFER: "NEW_SUGGESTED_OFFER",
    };
  },
  sendNewSuggestedOfferNotification: (firebase_tokens, offer_id) => {
    const message = {
      notification: {
        title: "عرض جديد مقترح",
        body: "عرض مقترح جديد مطابق لبحثك",
      },
      data: {
        NOTIFY_TYPE: module.exports.NOTIFY_TYPES().NEW_SUGGESTED_OFFER,
        offer_id: offer_id.toString(),
      },
      tokens: firebase_tokens,
    };

    admin
      .messaging()
      .sendMulticast(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  },
};
