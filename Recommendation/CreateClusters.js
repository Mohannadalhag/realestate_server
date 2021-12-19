//https://www.npmjs.com/package/@greenelab/hclust
const {
  clusterData,
  euclideanDistance,
  avgDistance,
} = require("@greenelab/hclust");

(() => {
  const data = [
    [6, 1],
    [4, 2],
    [3, 5],
  ];

  //   const key = "";
  //   const distance = euclideanDistance;
  //const linkage = avgDistance;
  // const onProgress = console.log;
  const { clusters, distances, order, clustersGivenK } = clusterData({
    data,
  });
  console.log("clusters: ", JSON.stringify(clusters, null, 4));
  console.log("distances: ", distances);
  console.log("order: ", order);
  console.log("clustersGivenK: ", clustersGivenK);
})();
