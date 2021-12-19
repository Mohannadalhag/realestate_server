const admin = require("firebase-admin");

const serviceAccount = require("./real-estates-55c98-firebase-adminsdk-yddy1-01f3d13398.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
