"use strict";
const rp = require("request-promise");
const db = require("./establish-connection");
var dateFormat = require("dateformat");

const options = {
  uri:
    "https://api.apify.com/v1/execs/J4whc7NTuYBXKXbau/results?format=json&simplified=1",
  json: true
};

const validateData = (ele, i) => {
  if (
    typeof ele.url === "undefined" ||
    typeof ele.market_date === "undefined" ||
    typeof ele.location.country === "undefined" ||
    typeof ele.location.city === "undefined" ||
    typeof ele.size.rooms === "undefined" ||
    typeof ele.price.value === "undefined" ||
    typeof ele.price.currency === "undefined" ||
    typeof ele.location.coordinates.lat === "undefined" ||
    typeof ele.location.coordinates.lat === "undefined"
  ) {
    return false;
  }

  if (Number.isNaN(Number(ele.price.value)) || Number(ele.price.value) === 0) {
    return false;
  }
  if (new Date(ele.market_date) == "Invalid Date") {
    return false;
  }
  if (Number(ele.size.rooms) === 0) {
    return false;
  }
  return true;
};

const toNum = valuePath => {
  if (!Number.isNaN(valuePath)) return Number(valuePath);
};

let normalizeValues = (ele, i) => {
  const { url: link } = ele;
  delete ele.url;
  ele.size.rooms = toNum(ele.size.rooms);
  ele.market_date = dateFormat(ele.market_date, "yyyy-m-d");
  ele.size.gross_m2 = toNum(ele.size.gross_m2);
  ele.location.coordinates.lat = toNum(ele.location.coordinates.lat);
  ele.location.coordinates.lng = toNum(ele.location.coordinates.lng);
  ele.price.value = toNum(ele.price.value);
  ele.description = ele.description
    .replace(/\r?\"|\r/g, "'")
    .replace(/\r?\n|\r/g, " ")
    .replace("€", "EUR");
  ele.images = ele.images.toString();
  return { link, ...ele };
};

let normalizeValidData = data => {
  return data.filter(validateData).map(normalizeValues);
};

async function getDataFromApify() {
  try {
    const fetchedData = await rp(options);

    let dataValues = [];
    let processedData = normalizeValidData(fetchedData).forEach(property => {
      const propertyValues = [
        property.link,
        property.market_date,
        property.sold,
        property.location.country,
        property.location.city,
        property.location.address,
        property.location.coordinates.lat,
        property.location.coordinates.lng,
        property.size.gross_m2,
        property.size.rooms,
        property.price.value,
        property.price.currency,
        property.description,
        property.title,
        property.images
      ];

      dataValues.push(propertyValues);
    });

    const sql = `INSERT INTO houses (link, market_date, sold, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images) VALUES ?`;

    db.query(sql, [dataValues], function (err, result) {
      if (err) throw new Error("Error in inserting data to database") + err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  } catch (error) {
    console.log(error);
  }
}
getDataFromApify();
