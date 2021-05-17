const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const stringify = require("json-stringify-safe");
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
