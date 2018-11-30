const rp = require("request-promise");
const cheerio = require("cheerio");

const URL =
  "https://en.spitogatos.gr/search/results/residential/sale/r100/m100m";

function getHouseUrlPerPage(url) {
  return rp(url)
    .then(html => {
      const UrlsPerPage = [];
      const $ = cheerio.load(html);

      $(".media")
        .children("a")
        .each((i, ele) => {
          if (i % 2 == 0) {
            UrlsPerPage.push($(ele).attr("href"));
          }
        });
      return UrlsPerPage;
    })
    .catch(error => {
      console.error(error);
    });
}

function mainPagesUrls() {
  const mainUrls = [URL];
  let offset = 10;

  for (let i = 0; i < 9; i++) {
    mainUrls.push(URL + "/offset_" + offset);
    offset += 10;
  }

  return mainUrls;
}

const pagesUrl = mainPagesUrls();

async function fetchAllHouseLinks(arr) {
  try {
    const allUrls = [];
    for (let i = 0; i < arr.length; i++) {
      const result = await getHouseUrlPerPage(arr[i]);
      allUrls.push(...result);
    }
    return allUrls;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { fetchAllHouseLinks, pagesUrl };
