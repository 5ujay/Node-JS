const mongoose = require("mongoose");

// Define the connection for the url
const mongodbURL = "mongodb://localhost:27017/hotels";

// steup mongoose to connect to the database
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to ");
});

db.on("error", (err) => {
  console.error("Mongoose connection error: " + err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected from " );
});

// Export the connection
module.exports = db;
