'use strict';
const express = require("express");
const app = express();
const rwClient = require("./Controllers/twitterPot.js");
const fetch = require('node-fetch');
const cron = require('node-cron');
const path = require('path');

// load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Home Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Quran Pot Server Running",
  });
})


// Handeling the cron job
const tweet = async () => {
  let quranApi = 'https://api.alquran.cloud/ayah/';
  try {
    let random = Math.floor(Math.random() * 6236) + 1
    let response = await fetch(quranApi + random + "/ar.asad")
    let data = await response.json();
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.toLocaleTimeString();
    let dateTime = date + '  ' + time;
    await rwClient.v1.tweet(JSON.stringify(data.data.text) + '\n \n Date: ' + dateTime);
    console.log("tweet successfully created")
  } catch (e) {
    console.error(e)
  }
}

// Cron job
cron.schedule('*/12 * * * *', () => {
  tweet();
});


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running on port 3000")
});