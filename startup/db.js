const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.DATABASE_URI, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected..."));
};
