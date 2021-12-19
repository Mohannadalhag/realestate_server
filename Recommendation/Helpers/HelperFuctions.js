//https://www.analyticsvidhya.com/blog/2020/10/quick-guide-to-evaluation-metrics-for-supervised-and-unsupervised-machine-learning/
module.exports = {
  sum: (x) => {
    return x.reduce((a, b) => a + b);
  },
  euclidean: (x, y) => {
    let elementsDistance = x.map((value, index) =>
      Math.pow(x[index] - y[index], 2)
    );
    return Math.pow(module.exports.sum(elementsDistance), 0.5);
  },
  average: (vectors) => {
    const result = [];
    for (j = 0; j < vectors[0].length; j++) {
      let sum = 0;
      for (i = 0; i < vectors.length; i++) {
        sum += vectors[i][j];
      }
      let avg = (1.0 * sum) / vectors.length;
      result[j] = avg;
    }
    return result;
  },
  aOrb: (cluster, user_vector, flag) => {
    let sum = 0;
    cluster.users.map((user) => {
      sum += module.exports.euclidean(user_vector.vector, user.vector);
    });
    if (flag == "a") {
      if (cluster.users.length == 1) return 0;
      return (1.0 * sum) / (cluster.users.length - 1);
    }
    if (flag == "b") return (1.0 * sum) / cluster.users.length;
  },
  getNearestCluster: (clusters, currentCluster) => {
    let nearest_cluster = null;
    let dis = 100;
    clusters.map((cluster) => {
      const d = module.exports.euclidean(cluster.center, currentCluster.center);
      if (d != 0) {
        if (d <= dis) {
          dis = d;
          nearest_cluster = cluster;
        }
      }
    });

    const res = {
      distance: dis,
      nearest_cluster: nearest_cluster,
    };

    return res;
  },
};
