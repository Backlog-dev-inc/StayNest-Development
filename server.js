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
const validateDB = (req, res, next) => {
  dbReady
    .then((connected) => {
      if (connected) {
        next();
      } else {
        next(new servErr());
      }
    })
    .catch(next);
};

const schemaValidate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw new servErr(400, error.message);
  } else {
    next();
  }
};

// Configure the template engine and directory used for view files.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Parse form data and allow HTML forms to submit PUT and DELETE requests.
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));
app.use(validateDB);

// Listing: index route
app.get(
  "/listings",
  wrapAsync(async (req, res, next) => {
    let allListings = await Listing.find().catch((err) => {
      console.log(err);
      throw new servErr();
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
    await Listing.insertOne(listing).catch((err) => {
      console.log(err);
      throw new servErr();
    });
    res.redirect("/listings");
  }),
);

// Listing: show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).catch((err) => {
      console.log(err);
      throw new servErr(404, "Page Not Found");
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      throw new servErr(404, "Page Not Found");
    });
    res.redirect("/listings");
  }),
);

app.all("/{*splat}", (req, res) => {
  throw new servErr(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  console.log(message);
  if (statusCode == 404) {
    message =
      "The page you're looking for doesn't exist or might have been moved.";
  } else if (statusCode == 500) {
    message = "Something unexpected happened on our side.";
  }
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});

// Start the server and listen for incoming requests.
const dbReady = main()
  .then(() => {
    console.log("connected to DB");
    return true;
  })
  .catch((err) => {
    console.log(`DB connection failed: ${err.message}`);
    return false;
  });

app.listen(3300, "0.0.0.0", () => {
  console.log("server is listening on port: 3300");
});
