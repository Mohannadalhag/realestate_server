const searches = require("./searches2");
const fs = require("fs");

const getEmails = async (searches) => {
  const uniques = [];

  for (i = 0; i < searches.length; i++) {
    const region = searches[i].region;

    if (!uniques.includes(region)) {
      uniques.push(region);
    }
  }
  return uniques;
};

const get_uniques_data = async () => {
  const uniques = await getEmails(searches);

  fs.writeFile("Output.txt", uniques.toString(), (err) => {
    if (err) throw err;
  });
};

get_uniques_data();
