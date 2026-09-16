const e = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayNest");
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("This is root path.");
});

app.get("/testListing", async (req, res) => {
  await Listing.insertOne({
    title: "My New Villa",
    description: "By the Beach",
    price: 1200,
    location: "Zuhu Beach, Mumbai",
    country: "India",
  });
  console.log("sample is saved.");
  res.send("succesfull testing.");
});

app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
