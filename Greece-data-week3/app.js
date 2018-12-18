("use strict");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { validateEntries, normalizeRow } = require("./validate-normalize-data");
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1980",
  database: "greece"
});

app.post("/upload", (req, res) => {
  try {
    const data = validateEntries(req.body.houses);
    res.json({
      processed: data.length,
    })
      .end();

    const normalizedData = data.map(normalizeRow);

    if (normalizedData.length) {
      const sql =
        " REPLACE INTO houses (link, market_date, sold, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images) values ?";
      db.query(
        sql,
        [
          normalizedData.map(raw => [
            raw["link"],
            raw["market_date"],
            raw["sold"],
            raw["location"].country,
            raw["location"].city,
            raw["location"].address,
            raw["location"].coordinates.lat,
            raw["location"].coordinates.lng,
            raw["size"].gross_m2,
            raw["size"].rooms,
            raw["price"].value,
            raw["price"].currency,
            raw["description"],
            raw["title"],
            raw["images"]
          ])
        ],
        (error, result) => {
          if (error) {
            throw error;
          }
          console.log("OK", result);
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/list", (req, res) => {
  const sql = `select link, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_parcelm2, size_grossm2, size_rooms, price_value, price_currency, description, title, images from houses`;

  db.query(sql, (error, result) => {
    if (error) {
      db.end();
      throw error;
    }
    res.json(result);
  });
});


const port = process.env.PORT || 3120;
db.connect(error => {
  if (error) {
    throw error;
  }
  app.listen(port, (err) => {
    console.log(`db is up, app is running at http://localhost:${port}`);
  });
});