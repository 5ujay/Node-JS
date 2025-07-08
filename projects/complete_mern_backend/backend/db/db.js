const mongoose = require("mongoose");
require("dotenv").config();

// 🔗 Get MongoDB connection string from environment variables
const mongodburl = process.env.MONGODBURL;

// 🌐 Connect to MongoDB
mongoose.connect(mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🔁 Reference to the connection
const db = mongoose.connection;

// ✅ When successfully connected
db.on("connected", () => {
  console.log("✅ Connected to MongoDB successfully");
});

// ❌ When connection is disconnected
db.on("disconnected", () => {
  console.log("❌ Disconnected from MongoDB");
});

// ⚠️ When there is a connection error
db.on("error", (error) => {
  console.error("❗ MongoDB connection error:", error);
});

module.exports = db;
