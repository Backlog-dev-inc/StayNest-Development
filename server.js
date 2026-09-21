const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const override = require("method-override");
const ejsMate = require("ejs-mate");

// Connect to the StayNest MongoDB database.
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StayNest");
}

// Configure the template engine and directory used for view files.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Parse form data and allow HTML forms to submit PUT and DELETE requests.
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));

// Establish the database connection before handling application requests.
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Health-check route for the application root.
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
  try {
    let { listing } = req.body;
    await Listing.insertOne(listing);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.redirect("/listings");
  }
});

// Listing: show route
app.get("/listings/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.log(err);
  }
});

// Listing: edit route
app.get("/listings/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    console.log(err);
  }
});

// Listing: update route
app.put("/listings/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
      runValidators: true,
      returnDocument: "after",
    });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log(err);
  }
});

// Listing: delete route
app.delete("/listings/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
  }
});

// Start the server and listen for incoming requests.
app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
