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
      "https://drive.google.com/uc?export=view&id=1CbYfc6knWCwouAv-ZaVzyCpi5i4GSFM5",
    set: (v) =>
      v === ""
        ? "https://drive.google.com/uc?export=view&id=1CbYfc6knWCwouAv-ZaVzyCpi5i4GSFM5"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
