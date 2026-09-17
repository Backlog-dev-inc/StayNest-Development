const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayNest");
}

connectDB()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function initDB() {
  try {
    await Listing.deleteMany();
    await Listing.insertMany(initData);
    console.log("data is initialized");
  } catch (err) {
    console.log(err);
  }
}

initDB();
