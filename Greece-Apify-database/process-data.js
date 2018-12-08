"use strict";
const rp = require("request-promise");
const db = require("./establish-connection");
const options = {
  uri:
    "https://api.apify.com/v1/execs/rxkuPFRqn6abGxXeA/results?format=json&simplified=1",
  json: true
};

const validateData = (ele, i) => {
  if (ele.description.includes("Athens -") && ele.description.length < 100) {
    return false;
  }
  if (ele.size.rooms) {
    const toNumber = Number(ele.size.rooms);
    if (Number.isNaN(toNumber)) {
      return false;
    }
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
  ele.size.gross_m2 = toNum(ele.size.gross_m2);
  ele.location.address = ele.location.address.replace(/\s-\s/g, "- ");
  ele.location.city = ele.location.city.replace(/\s-\s/g, "- ");
  ele.location.coordinates.lat = toNum(ele.location.coordinates.lat);
  ele.location.coordinates.lng = toNum(ele.location.coordinates.lng);
  ele.price.value = toNum(ele.price.value);
  ele.description = ele.description
    .replace(/\r?\"|\r/g, "'")
    .replace(/\r?\n|\r/g, " ")
    .replace("€", "EUR");
  ele.title = ele.title.replace("€", "EUR");
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

    const sql =
      "INSERT INTO greece_houses (link, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images) VALUES ?";

    db.query(sql, [dataValues], function(err, result) {
      if (err) throw new Error("Error in inserting data to database") + err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  } catch (error) {
    console.log(error);
  }
}
getDataFromApify();
