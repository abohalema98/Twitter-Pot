'use strict';
const express = require("express");
const app = express();
const rwClient = require("./Controllers/twitterPot.js");
const fetch = require('node-fetch');
const cron = require('node-cron');

app.get("/", (req, res) => {
  res.send("Quran Pot!");
})

const tweet = async () => {
  let quranApi =  'https://api.alquran.cloud/ayah/';
  try {
    let random = Math.floor(Math.random() * 6236) + 1
    let response = await fetch(quranApi + random +  "/ar.asad")
    let data = await response.json();
      await rwClient.v1.tweet(JSON.stringify(data.data.text));
      console.log("tweet successfully created")
  } catch (e) {
      console.error(e)
  }
}

cron.schedule('*/5 * * * *', () => {
  tweet();
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("server is running on port 3000") });
