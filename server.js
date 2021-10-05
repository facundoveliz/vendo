const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

// require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
