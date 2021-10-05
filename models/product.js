const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(124).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().min(3).max(4096).required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
