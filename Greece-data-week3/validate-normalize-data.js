const moment = require('moment');
moment().format();
const validator = require("validator");

const validateData = (propertyData, i) => {
  if (
    typeof propertyData["url"] == "undefined" || propertyData["url"] == "" ||
    typeof propertyData["location"].city == "undefined" || propertyData["location"].city == "" ||
    typeof propertyData["location"].country == "undefined" || propertyData["location"].country == "" ||
    typeof propertyData["size"].rooms == "undefined" || propertyData["size"].rooms == "" ||
    typeof propertyData["price"].value == "undefined" || propertyData["price"].value == "" ||
    typeof propertyData["price"].currency == "undefined" || propertyData["price"].currency == "" ||
    typeof propertyData["location"].coordinates == "undefined" || /^$/.test(propertyData["location"].city) || /^$/.test(propertyData["location"].country) || /^$/.test(propertyData["url"]) || /^$/.test()

  ) {
    return false
  }

  if (!validator.isURL(propertyData["url"])) {
    return false
  }
  if (typeof (propertyData["market_date"]) == "undefined") {
    return propertyData["market_date"] = new Date();
  }

  if (isNaN(propertyData["price"].value)) {
    return false
  }
  return true
};

module.exports.validateEntries = data => {

  return data.filter(validateData);

};

module.exports.normalizeRow = (data, i) => {
  if (!/^[0-9]*(\.[0-9]{1,15})?$/.test(data["location"].coordinates.lng) || /^$/.test(data["location"].coordinates.lng) || !/^[0-9]*(\.[0-9]{1,15})?$/.test(data["location"].coordinates.lat) || /^$/.test(data["location"].coordinates.lat)) {
    data["location"].coordinates.lat = null
    data["location"].coordinates.lng = null
  } else {
    data["location"].coordinates.lat = Number(data["location"].coordinates.lat)
    data["location"].coordinates.lng = Number(data["location"].coordinates.lng)
  }

  if (data["market_date"] == "" || moment(data["market_date"], 'DD-MM-YYYY').format("YYYY-MM-DD") == 'Invalid date') {
    data['market_date'] = new Date()
  }
  data['market_date'] = moment(data["market_date"], 'DD-MM-YYYY').format("YYYY-MM-DD")

  return {
    ...data,
    link: data["url"].trim(),
    size_grossm2: Number(data["size"].gross_m2),
    size_rooms: Number(data["size"].rooms),
    title: data["title"].trim(),
    description: data["description"].replace(/\r?\n|\r/g, " "),
    images: data["images"].toString()
  };

};

