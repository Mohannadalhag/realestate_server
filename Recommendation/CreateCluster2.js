//https://www.npmjs.com/package/hclusterjs
const hclust = require("hclust");

let arrays = [
  [6, 1],
  [4, 2],
  [3, 5],
];
let clusters = hclust(arrays);
console.log(JSON.stringify(clusters, null, 4));
