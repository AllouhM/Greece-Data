"use strict";
const mysql = require("mysql");
// const array = require("./normalized-data");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1980",
  database: "greece_data"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE greece_houses (link VARCHAR(255) NOT NULL, location_country VARCHAR(50) NOT NULL, location_city VARCHAR(50) NOT NULL, location_address VARCHAR(255), location_coordinates_lat FLOAT(10, 6), location_coordinates_lng FLOAT(11, 6), size_parcelm2 FLOAT(10, 2),  size_grossm2 FLOAT(10, 2), size_netm2 FLOAT(10, 2), size_rooms FLOAT(10, 2) NOT NULL, price_value FLOAT(15, 2) NOT NULL, price_currency CHAR(3) NOT NULL, description TEXT, title CHAR(255), images TEXT, PRIMARY KEY (link))";

  db.query(sql, function(err, result) {
    if (err) throw new Error("error in creating table" + err);
    console.log("Table created");
  });
});
