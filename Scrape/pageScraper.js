const fs = require("fs");
//const startFetchApi = require("./API-Fetch");
let number_of_pages = 0;
const scraperObject = {
  url: "http://www.ikar.sy/search?&page_number=91",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);

    await page.goto(this.url, {
      waitUntil: "load",
      waitUntil: "domcontentloaded",
      waitUntil: "networkidle0",
      waitUntil: "networkidle2",
      // Remove the timeout
      timeout: 0,
    });

    await page.waitFor("*");

    let allData = [];
    //---------------------------------
    // Wait for the required DOM to be rendered
    async function scrapeCurrentPage() {
      //-----------------
      // Wait for the required DOM to be rendered
      await page.waitForSelector("#main_container_outer");
      // Get the link to all the required books

      //-------------------
      await page.waitForSelector(".col-xl-3.col-lg-4.col-md-4.col-sm-6.mb-3");
      //-------------------

      await page.waitFor("*");

      let urls = await page.$$eval(
        ".col-xl-3.col-lg-4.col-md-4.col-sm-6.mb-3",
        (links) => {
          // Extract the links from the data
          links = links.map(
            (el) => el.querySelector("div > div > div > a").href
          );
          return links;
        }
      );

      // Loop through each of those links, open a new page instance and get the relevant data from them

      let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();

          newPage.on("response", (response) => {
            const request = response.request();
            const resourceType = request.resourceType();
            if (
              resourceType == "xhr" &&
              `${request.url()}`.indexOf("ikar_api") > -1
            ) {
              dataObj[`${resourceType}`] = `${request.url()}`;

              //--------------------------------------------
              /*
              let pageAPIPromise = (linkAPI) =>
                new Promise(async (resolve, reject) => {
                  try {
                    let dataObjAPI;
                    const pageAPI = await browser.newPage();

                    pageAPI.on("response", async (response) => {
                      dataObjAPI = await response.json();
                      console.log(response.json());
                    });

                    await pageAPI.goto(linkAPI, {
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

                    resolve(dataObjAPI);
                    await pageAPI.close();
                  } catch (error) {
                    console.log(error);
                  }
                });

              pageAPIPromise(`${request.url()}`).then((result) => {
                dataObj[`${resourceType}`].push(result);
                console.log(result);
              });
              */

              //-------------------------------------------------------
            }
          });

          await newPage.goto(link, {
            waitUntil: "load",
            waitUntil: "domcontentloaded",
            waitUntil: "networkidle0",
            waitUntil: "networkidle2",
            // Remove the timeout
            timeout: 0,
          });

          await newPage.waitFor("*");
          await newPage.waitForSelector(
            "#main_container_outer > div > div.bg-light.p-3.main_container_inner > div > div > div.col-lg-10.col-sm-12 > div.show-property-details.mb-2 > div.col-12.px-sm-2.px-md-5.px-lg-2 > div"
          );

          resolve(dataObj);
          await newPage.close();
        });

      for (link in urls) {
        let currentPageData = await pagePromise(urls[link]);
        // scrapedData.push(currentPageData);
        console.log(currentPageData);
        allData.push(currentPageData["xhr"]);
      }
      //------------------------------------------------

      // When all the data on this page is done, click the next button and start the scraping of the next page
      // You are going to check if this button exist first, so you know if there really is a next page.
      let nextButtonExist = false;
      try {
        const nextButton = await page.$eval(
          "#main_container_outer > div > div.bg-light.p-3.main_container_inner > div.property-container > div > nav > ul > li > a.page-link.page_link_next.noselect.display_gold",
          (a) => a.textContent
        );

        /*
        const nextButton = await page.evaluate((element) => {
          return element.textContent;
        }, (await page.$x("/html/body/div/div/div[5]/div/div[2]/div[2]/div/nav/ul/li[4]/a"))[0]);
*/

        number_of_pages++;
        console.log("number_of_pages", number_of_pages);
        if (number_of_pages == 10) return;
        nextButtonExist = true;
        console.log(" nextButtonExist", nextButtonExist);
      } catch (err) {
        nextButtonExist = false;
        console.log(" Not nextButtonExist", nextButtonExist);
      }
      if (nextButtonExist) {
        await page.click(
          "#main_container_outer > div > div.bg-light.p-3.main_container_inner > div.property-container > div > nav > ul > li > a.page-link.page_link_next.noselect.display_gold"
        );

        /*
        const elements = await page.$x(
          "/html/body/div/div/div[5]/div/div[2]/div[2]/div/nav/ul/li[4]/a"
        );
        await elements[0].click();
          */
        return scrapeCurrentPage(); // Call this function recursively
      }
      await page.close();
      return allData;
    }
    let data = await scrapeCurrentPage();
    console.log(data);
    //return data;

    //-------------------------------------------------

    fs.writeFile(
      "data.json",
      JSON.stringify({ allData }),
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
  },
};

module.exports = scraperObject;
