const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { validateEntries, normalizeRow } = require("./validate-normalize-data");
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1980",
  database: "greece_data"
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/upload", (req, res) => {
  try {
    const data = validateEntries(req.body);
    console.log("mmm", req.body);
    const validDate = data.filter(acceptedData => acceptedData.err === null);

    return res.json({
      processed: data.length,
      success: validDate.length,
      failed: data.filter(acceptedData => acceptedData.err !== null)
    });

    // const normalizedData = validDate.map(normalizeRow);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
});

app.get("/list", (req, res) => {
  const sql = `select link, location_country,location_city,location_address, location_coordinates_lat, location_coordinates_lng, size_parcelm2, size_grossm2, size_rooms, price_value, price_currency, description, title, images from greece_houses`;

  db.query(sql, (error, result) => {
    if (error) {
      db.end();
      throw error;
    }
    res.json(result);
    //   console.log("reult is Ok", result);
  });
});
app.use("*", (req, res) => {
  res.json({ message: "hi" });
});

const port = process.env.PORT || 3120;
db.connect(error => {
  if (error) {
    throw error;
  }
  app.listen(port, () => {
    console.log(`db is up, app is running at http://localhost:${port}`);
  });
});
