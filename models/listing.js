const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://cdn.jsdelivr.net/gh/Backlog-dev-inc/assets@latest/no-imager.jpg",
    set: (v) =>
      v === ""
        ? "https://cdn.jsdelivr.net/gh/Backlog-dev-inc/assets@latest/no-imager.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
