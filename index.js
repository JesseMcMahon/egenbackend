const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const stringify = require("json-stringify-safe");

app.use(express.json());

app.use(cors());

app.get("/testing", async (req, res) => {
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

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
