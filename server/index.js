// import { request } from 'undici'

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const request = require('request');
const request = require("undici");
const sample_data = require("./sample_data.json");
const api = require("./api.js");

require("dotenv").config();
const apiKey = process.env.API_KEY;
const appId = process.env.APP_ID;

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON body

let url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${apiKey}&results_per_page=5`;
let page = 0;
let limit = 1;

app.use(express.static(path.resolve(__dirname, "../job-search/build")));

app.get("/api", async (req, res) => {
  data = await api.getData({ jobTitle: "Web Developer" });
  res.json(data);

  // res.json(sample_data);
});

app.post("/api", async (req, res) => {
  let filters = {};
  if (req.body.title) {
    filters.jobTitle = req.body.title;
  }
  data = await api.getData(filters);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../job-search/build", "index.html"));
});

app.post("/", (req, res) => {
  var input = req.body.location;
  data = api.getData(input);
  res.json(data);
  // res.sendFile(path.resolve(__dirname, '../job-search/build', 'index.html'));
});
