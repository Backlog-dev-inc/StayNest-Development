const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const override = require("method-override");
const ejsMate = require("ejs-mate");
const servErr = require("./utils/servErr.js");
const wrapAsync = require("./utils/wrapAsync.js");
const listingSchema = require("./schema.js");

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
    console.log(`DB connection failed: ${err.message}`);
  });

const schemaValidate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new servErr(400, error);
  } else {
    next();
  }
};

// Listing: index route
app.get(
  "/listings",
  wrapAsync(async (req, res, next) => {
    let allListings = await Listing.find().catch(() => {
      throw new servErr(500, "Something went wrong!");
    });
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
  schemaValidate,
  wrapAsync(async (req, res, next) => {
    let { listing } = req.body;
    if (!listing) {
      throw new servErr(400, "Invalid request is sent: 'listing' is required.");
    }
    await Listing.insertOne(listing);
    res.redirect("/listings");
  }),
);

// Listing: show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).catch((err) => {
      throw new servErr(400, "Page Not Found");
    });
    res.render("listings/show.ejs", { listing });
  }),
);

// Listing: edit route
app.get(
  "/listings/edit/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).catch((err) => {
      throw new servErr(404, "Page Not Found");
    });
    res.render("listings/edit.ejs", { listing });
  }),
);

// Listing: update route
app.put(
  "/listings/update/:id",
  schemaValidate,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
      runValidators: true,
      returnDocument: "after",
    }).catch((err) => {
      throw new servErr(404, "Page Not Found");
    });
    res.redirect(`/listings/${id}`);
  }),
);

// Listing: delete route
app.delete(
  "/listings/delete/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id).catch((err) => {
      throw new servErr(404, "Page Not Found");
    });
    res.redirect("/listings");
  }),
);

app.all("/{*splat}", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(`<h1>${message}</h1>`);
});

// Start the server and listen for incoming requests.
app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
