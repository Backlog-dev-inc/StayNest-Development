const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().label("Title"),
    price: Joi.number().required().min(0).label("Price"),
    description: Joi.string().allow("", null),
    image: Joi.string().allow("", null),
    location: Joi.string().required().label("Location"),
    country: Joi.string().required().label("Country"),
  })
    .required()
    .label("Listing"),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5).label("Rating"),
    comment: Joi.string().required().label("Review"),
  }),
});

module.exports = { listingSchema, reviewSchema };
