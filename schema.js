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

module.exports = listingSchema;
