const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayNest");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

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

// Listing: index route
app.get("/listings", async (req, res) => {
  try {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    console.log(err);
  }
});

// Listing: new route
app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});

// Listing: create route
app.post("/listings/create", async (req, res) => {
  let { listing } = req.body;
  Listing.insertOne(listing);
  res.redirect("/listings");
});

// Listing: show route
app.get("/listings/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
