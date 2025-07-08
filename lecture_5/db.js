const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodbURL = process.env.MONGO_DB_URL;

mongoose.connect(mongodbURL); // Clean connection

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to database");
});

db.on("error", (err) => {
  console.error("Mongoose connection error: " + err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected from database");
});

module.exports = db;
