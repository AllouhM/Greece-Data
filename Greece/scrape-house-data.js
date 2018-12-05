const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { fetchAllHouseLinks, pagesUrl } = require("./all-houses-urls");

function scrapHouse(url) {
  return rp(url)
    .then(html => {
      const $ = cheerio.load(html);
      const classDetails = [];
      $(".text.black.color.bold").each((i, ele) => {
        const eachDetail = $(ele).text();
        classDetails.push(eachDetail);
      });

      const classNames = [];
      $(".desktop-3-details")
        .children("h6")
        .each((i, ele) => {
          const eachClass = $(ele).text();
          classNames.push(eachClass);
        });
      const classValues = [];
      $(".desktop-5-details").each((i, ele) => {
        const eachClass = $(ele).text();
        classValues.push(eachClass);
      });

      const houseObj = {};
      classNames.forEach((elem, i) => {
        houseObj[elem] = classValues[i];
        // return houseObj;
      });
      const address = classDetails[1].trim();
      const indexOfM = houseObj.Area.trim().indexOf("m");
      const size = houseObj.Area.trim().substring(0, indexOfM - 1);

      const type = houseObj.Type.trim();
      const constructionYear = houseObj["Construction year"].trim();

      const price = $(".text.black.inline.color.bold.padding-right")
        .text()
        .replace(/,/g, "")
        .substring(1)
        .trim();

      return {
        price,
        size,
        address,
        type,
        constructionYear
      };
    })
    .catch(error => {
      console.log(error);
    });
}
async function scrapEachHouse(arr) {
  try {
    const targetedData = [];
    for (let i = 0; i < 3; i++) {
      const houseObj = await scrapHouse(arr[i]);
      targetedData.push(houseObj);
    }

    fs.writeFile(
      "./scraped-data.json",
      JSON.stringify(targetedData, null, 2),
      function(error) {
        if (error) {
          console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
async function final() {
  return await fetchAllHouseLinks(pagesUrl)
    .then(allHousesUrls => {
      scrapEachHouse(allHousesUrls);
    })
    .catch(error => {
      console.log(error);
    });
}

final();
