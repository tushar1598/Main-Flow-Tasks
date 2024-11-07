const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MongoDB_URL);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});
module.exports = db;
