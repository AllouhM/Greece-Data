const pr = require("request-promise");
const fs = require("fs");
const validator = require("validator");
// const houses = require("./scrapedData.json");
// console.log(houses);

const options = {
  uri:
    "https://api.apify.com/v1/execs/T3TGMrFRH2oBkMdW9/results?format=json&simplified=1",
  json: true
};

const requiredfields = [
  "link",
  `location_country`,
  "location_city",
  "size_rooms",
  "price_value",
  "price_currency"
];
// async function final() {
//   const data = await pr(options);
//   data.forEach(element => {
//     validateData(element);
//   });

//   // validateData(element);
// }

// validateData = (propertyData, i) => {
//   if (
//     requiredfields.some(field => {
//       return typeof propertyData[field] === undefined;
//     })
//   ) {
//     return false;
//   }
//   if (!validator.isURL(propertyData[url])) {
//     return false;
//   }
//   if (
//     house.description.includes("Athens -") &&
//     house.description.length < 100
//   ) {
//     return false;
//   }
//   if (house.size.rooms) {
//     const toNumber = Number(house.size.rooms);
//     if (Number.isNaN(toNumber)) {
//       return false;
//     }
//   }

//   return true;
// };

// const toNum = valuePath => {
//   if (!Number.isNaN(valuePath)) return Number(valuePath);
// };

// const normalizeValues = (ele, i) => {
//   const { url: link } = ele;
//   delete ele.url;
//   ele.size.rooms = toNum(ele.size.rooms);
//   ele.size.gross_m2 = toNum(ele.size.gross_m2);
//   ele.location.address = ele.location.address.replace(/\s-\s/g, "- ");
//   ele.location.city = ele.location.city.replace(/\s-\s/g, "- ");
//   ele.location.coordinates.lat = toNum(ele.location.coordinates.lat);
//   ele.location.coordinates.lng = toNum(ele.location.coordinates.lng);
//   ele.price.value = toNum(ele.price.value);
//   ele.description = ele.description
//     .replace(/\r?\"|\r/g, "'")
//     .replace(/\r?\n|\r/g, " ")
//     .replace("€", "EUR");
//   ele.title = ele.title.replace("€", "EUR");
//   ele.images = ele.images.toString();
//   return { link, ...ele };
// };
const validateData = (proceeded, propertyData) => {
  let err = null;

  if (
    requiredfields.some(field => {
      //   console.log(typeof propertyData[field]);
      return typeof propertyData[field] === undefined;
    })
  ) {
    err = `some of the required fields are missing, required fields: ${requiredfields} `;
  }
  if (!validator.isURL(propertyData["link"])) {
    err = `'url' field should be valid URL `;
  }
  proceeded.push({
    // valid: err === null,
    err: err,
    raw: propertyData
  });
  return proceeded;
};
module.exports.validateEntries = data => {
  console.log("data", data);
  const processData = data.reduce(validateData, []);
  return processData;
};
module.exports.normalizeRow = ({ raw }) => {
  // console.log("rse", raw);
  return {
    ...raw,
    location_city: raw["location_city"].trim()
  };
};
// final();
