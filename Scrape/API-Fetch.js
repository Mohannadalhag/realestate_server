const browserObject = require("./browser");
const fs = require("fs");

let pagePromise = (link, browser) =>
  new Promise(async (resolve, reject) => {
    try {
      let dataObj = {};
      console.log("object");

      const page = await browser.newPage();

      page.on("response", async (response) => {
        dataObj = await response.json();
      });

      await page.goto(link, {
        waitUntil: "load",
        waitUntil: "domcontentloaded",
        waitUntil: "networkidle0",
        waitUntil: "networkidle2",
        // Remove the timeout
        timeout: 0,
      });

      //setTimeout(async () => {
      //  await browser.close();
      //}, 60000 * 4);

      resolve(dataObj);
      await page.close();
    } catch (error) {
      console.log(error);
    }
  });

async function getData() {
  /*
  let urls = [
    "http://www.ikar.sy/ikar_api/v1/property?reference_id=%D8%A7%D9%84%D8%AD%D8%B3%D9%83%D8%A9_%D8%A8%D9%8A%D8%B9_%D8%B4%D9%82%D8%A9_%D8%A7%D9%84%D9%82%D8%A7%D9%85%D8%B4%D9%84%D9%8A_1606467642698",
    "http://www.ikar.sy/ikar_api/v1/property?reference_id=%D8%A7%D9%84%D8%AD%D8%B3%D9%83%D8%A9_%D8%A8%D9%8A%D8%B9_%D8%B4%D9%82%D8%A9_%D8%A7%D9%84%D9%82%D8%A7%D9%85%D8%B4%D9%84%D9%8A_1590683678703",
    "http://www.ikar.sy/ikar_api/v1/property?reference_id=%D8%A7%D9%84%D8%AD%D8%B3%D9%83%D8%A9_%D8%A8%D9%8A%D8%B9_%D8%B4%D9%82%D8%A9_%D8%A7%D9%84%D9%82%D8%A7%D9%85%D8%B4%D9%84%D9%8A_1590683601511",
  ];
  */

  let urlsObj = JSON.parse(fs.readFileSync("./Data/links10.json", "utf8"));
  urls = urlsObj["allData"];

  const result = [];

  let browser = await browserObject.startBrowser();
  for (link in urls) {
    const currentPageData = await pagePromise(urls[link], browser);
    console.log(currentPageData);
    result.push(currentPageData);
  }

  return result;
}

(async () => {
  const getDataArg = await getData();

  fs.writeFile(
    "./Data/data10.json",
    JSON.stringify({ getDataArg }),
    "utf8",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(
        "The data has been scraped and saved successfully! View it at './data.json'"
      );
    }
  );
})();
