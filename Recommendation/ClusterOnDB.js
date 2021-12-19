const arrClusters = require("./myjsonfile.json");
const Cluster = require("../Models/Cluster");
const UserVector = require("../Models/UserVector");
require("dotenv").config(".env");
require("../Config/InitiateMongoDB.Config");
const CLUSTERS = [
  {
    name: "C1",
    indexes: [
      4, 5, 56, 13, 25, 21, 22, 27, 7, 38, 46, 61, 16, 47, 52, 63, 20, 59,
    ],
  },
  {
    name: "C2",
    indexes: [12, 26, 9, 48, 66, 17, 28, 58, 40, 24, 32, 36, 57],
  },
  {
    name: "C3",
    indexes: [14, 39],
  },
  {
    name: "C4",
    indexes: [19],
  },
  {
    name: "C5",
    indexes: [0, 33, 50],
  },
  {
    name: "C6",
    indexes: [18],
  },
  {
    name: "C7",
    indexes: [15, 35],
  },
  {
    name: "C8",
    indexes: [45, 65, 8, 10, 31, 54, 64],
  },
  {
    name: "C9",
    indexes: [41, 51, 43, 67],
  },
  {
    name: "C10",
    indexes: [3, 29, 23, 1, 44, 62, 11, 49, 37],
  },
  {
    name: "C11",
    indexes: [34, 55],
  },
  {
    name: "C12",
    indexes: [42],
  },
  {
    name: "C13",
    indexes: [2, 6, 53],
  },
  {
    name: "C14",
    indexes: [60],
  },
];

CLUSTERS.map(async (C) => {
  const newCluster = await new Cluster({ name: C.name }).save();
  C.indexes.map((index) => {
    const newUserVector = new UserVector();
    newUserVector.user_id = arrClusters[index].id;
    newUserVector.vector = arrClusters[index].vector;
    newCluster.users.push(newUserVector);
  });
  await newCluster.save();
});
