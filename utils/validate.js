const { mongoose } = require("mongoose");
const { listingSchema, reviewSchema } = require("../schema.js");
const servErr = require("./servErr");

const listing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw new servErr(400, error.message);
  } else {
    next();
  }
};

const id = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new servErr(404, "Page Not Found");
  } else {
    next();
  }
};

const review = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw new servErr(400, error.message);
  } else {
    next();
  }
};

const error = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  console.log(message);
  if (statusCode == 404) {
    message =
      "The page you're looking for doesn't exist or might have been moved.";
  } else if (statusCode == 500) {
    message = "Something unexpected happened on our side.";
  }
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
};

module.exports = { listing, id, error, review };
