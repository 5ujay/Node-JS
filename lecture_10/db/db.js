const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodb_url = process.env.mongodb_url;

mongoose.connect(mongodb_url);

const db = mongoose.connection;

// When connected
db.on("connected", () => {
  console.log("✅ Connected to MongoDB successfully");
});

// When disconnected
db.on("disconnected", () => {
  console.log("❌ Disconnected from MongoDB");
});

// On connection error
db.on("error", (error) => {
  console.error("❗ MongoDB connection error:", error);
});
