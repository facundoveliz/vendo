const express = require("express");
const users = require("../routes/users");
const products = require("../routes/products");
const orders = require("../routes/orders");
// const error = require("../middleware/error");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", users);
  app.use("/api/products", products);
  app.use("/api/orders", orders);
  // app.use(error);
};
