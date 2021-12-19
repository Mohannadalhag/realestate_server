const Cluster = require("../../Models/Cluster");
const { average, getNearestCluster, aOrb } = require("./HelperFuctions");
require("dotenv").config(".env");
require("../../Config/InitiateMongoDB.Config");

// const main = async () => {
//   const clusters = await Cluster.find({});

//   clusters.map(async (cluster) => {
//     const vectors = [];
//     cluster.users.map((user_vector) => {
//       vectors.push(user_vector.vector);
//     });

//     const cluster_center = average(vectors);
//     cluster.center = cluster_center;
//     await cluster.save();
//   });
// };

const main = async () => {
  const clusters = await Cluster.find({});
  let sum = 0;
  let numberSamples = 0;

  clusters.map(async (cluster) => {
    const { distance, nearest_cluster } = getNearestCluster(clusters, cluster);
    cluster.users.map((user_vector) => {
      numberSamples++;
      let a = aOrb(cluster, user_vector, "a");
      let b = aOrb(nearest_cluster, user_vector, "b");
      console.log("a : ", a);
      console.log("b : ", b);
      sum += (b - a) / Math.max(a, b);
    });
  });

  console.log("Silhouette Coefficient : ", (1.0 * sum) / numberSamples);
};

main();
