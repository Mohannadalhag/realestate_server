const Agenda = require("agenda");
const { dbConnect, mongoose } = require("./InitiateMongoDB.Config");
//https://medium.com/hacktive-devs/nodejs-scheduling-tasks-agenda-js-4b6824f9457e

const agenda = new Agenda();
dbConnect.then(() => {
  agenda.mongo(mongoose.connection.db, "agendaJobs");
});

module.exports = agenda;
