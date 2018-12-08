"use strict";
const mysql = require("mysql");
const array = require("./normalized-data");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1980",
  database: "greece_data"
});
db.connect(function(err) {
  if (err) throw new Error("Error in establishing connection" + err);
});

module.exports = db;
