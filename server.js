const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const override = require("method-override");
const ejsMate = require("ejs-mate");
const servErr = require("./utils/servErr.js");
const wrapAsync = require("./utils/wrapAsync.js");
const validation = require("./utils/validate.js");

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

// Listing: index route
app.get(
  "/listings",
  wrapAsync(async (req, res, next) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  }),
);

// Listing: new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Listing: create route
app.post(
  "/listings/create",
  validation.listing,
  wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

// Listing: show route
app.get(
  "/listings/:id",
  validation.id,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new servErr(404, "Page Not Found");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

// Listing: edit route
app.get(
  "/listings/edit/:id",
  validation.id,
  wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new servErr(404, "Page Not Found");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

// Listing: update route
app.put(
  "/listings/update/:id",
  validation.id,
  wrapAsync(async (req, res, next) => {
    let updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body.listing,
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    if (!updatedListing) {
      throw servErr(404, "Page Not Found");
    }
    res.redirect(`/listings/${req.params.id}`);
  }),
);

// Listing: delete route
app.delete(
  "/listings/delete/:id",
  validation.id,
  wrapAsync(async (req, res, next) => {
    let deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      throw new servErr(404, "Page Not Found");
    }
    res.redirect("/listings");
  }),
);

// Review: post route
app.post(
  "/listings/:id/review",
  validation.id,
  validation.review,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new servErr(404, "Page Not Found");
    }
    let newReview = new Review(req.body.review);

    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    res.send("review added");
  }),
);

app.all("/{*splat}", (req, res) => {
  throw new servErr(404, "Page Not Found");
});

app.use(validation.error);

// Start the server and listen for incoming requests.
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(`DB connection failed: ${err.message}`);
  });

app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
