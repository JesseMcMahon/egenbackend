const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const stringify = require("json-stringify-safe");
const { response } = require("express");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser());

app.use(cors());

app.get("/", async (req, res) => {
  await axios
    .get(
      "https://jobs.github.com/positions.json?description=engineer&location=berlin",
      {
        Headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((data) => res.send(stringify(data)));
});

app.get("/userlocation", async (req, res) => {
  const { APIKEY, latitude, longitude } = req.query;
  const response = [];
  console.log(APIKEY, latitude, longitude);
  await axios
    .get(
      `https://us1.locationiq.com/v1/reverse.php?key=${APIKEY}&lat=${latitude}&lon=${longitude}&format=json`
    )
    .then((res) => response.push(res.data));

  res.send(response);
});

app.get("/locationbasedsearch", async (req, res) => {
  const { userCity } = req.query;
  const response = [];
  await axios
    .get(
      `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=&full_time=&location=${userCity}`
    )
    .then((res) => response.push(res.data));
  res.send(response);
});

app.get("/getjobs", async (req, res) => {
  const { searchTerm, fullTimeSelected, searchLocation } = req.query;
  const response = [];
  await axios
    .get(
      `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=${searchTerm}&full_time=${fullTimeSelected}&location=${searchLocation}`
    )
    .then((res) => response.push(res.data));
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
