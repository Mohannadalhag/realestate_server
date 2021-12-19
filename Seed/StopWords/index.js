const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend_server_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

const all_stop_words = require("./data");

console.log(all_stop_words);

const StopWords = require("../../Models/StopWord");

all_stop_words.forEach((ww) => {
  const w = new StopWords({
    word: ww,
  });
  w.save();
});
