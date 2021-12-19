const arrClusters = require("./clusters.json");

const result = [];
for (i = 0; i < arrClusters.length - 1; i++) {
  const singleRes = {};
  singleRes.d1 = arrClusters[i].distance;
  singleRes.d2 = arrClusters[i + 1].distance;
  singleRes.v = arrClusters[i].distance - arrClusters[i + 1].distance;
  result.push(singleRes);
}

result.sort((a, b) => (a.v > b.v ? 1 : b.v > a.v ? -1 : 0));

console.log(result);

let json = JSON.stringify(result);
require("fs").writeFile("varianceJson.json", json, "utf8", function (err) {
  if (err) throw err;
  console.log("complete");
});
