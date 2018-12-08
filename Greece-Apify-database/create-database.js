"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1980"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "CREATE DATABASE greece_data";
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Database created", result);
  });
});
