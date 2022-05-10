'use strict';
const express = require("express");
const app = express();
const rwClient = require("./Controllers/twitterPot.js");
const fetch = require('node-fetch');
const path = require('path');
const delay = 480000;

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
    let numberInSurah = await data.data.numberInSurah;
    let surah = await JSON.stringify([data.data.surah.name]);
    let ayah = await JSON.stringify(data.data.text);
    await rwClient.v1.tweet(ayah + '\n \n' + surah + ' - ' + ' رقم الآيــة: '+ numberInSurah);
    console.log("tweet successfully created")
  } catch (e) {
    console.error(e)
  }
}

// cron job to tweet every 8 minutes
setInterval(() => {
  tweet();
}, delay);


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running on port 3000")
});