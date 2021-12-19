const Agenda = require("../Config/InitiateAgenda.Config");

Agenda.define("print", { priority: "high", concurrency: 10 }, async (job) => {
  //const { exam_id } = job.attrs.data;
  console.log("Agenda Done ....");
});

module.exports = {
  print: async () => {
    await Agenda.start();
    await Agenda.schedule("in 2 s", "print", {});
  },
};
