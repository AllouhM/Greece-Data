
const dateFormat = require("dateformat");

const validateData = (propertyData, i) => {
  if (
    typeof propertyData["url"] == "undefined" ||
    typeof propertyData["market_date"] == null ||
    typeof propertyData["location"].city == "undefined" ||
    typeof propertyData["location"].country == "undefined" ||
    typeof propertyData["size"].rooms == "undefined" ||
    typeof propertyData["price"].value == "undefined" ||
    typeof propertyData["price"].currency == "undefined" ||
    typeof propertyData["location"].coordinates == "undefined"
  ) {
    return false
  }
  if (new Date(propertyData["market_date"]) == "Invalid Date") {
    return false
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
  console.log('reeem', data);
  return {
    ...data,
    link: data["url"].trim(),
    market_date: dateFormat(data["market_date"], "yyyy-m-d"),
    size_grossm2: Number(data["size"].gross_m2),
    size_rooms: Number(data["size"].rooms),
    location_coordinates_lat: Number(data["location"].coordinates.lat),
    location_coordinates_lng: Number(data["location"].coordinates.lng),
    title: data["title"].trim(),
    description: data["description"].replace(/\r?\n|\r/g, " "),
    images: data["images"].toString()
  };
};

