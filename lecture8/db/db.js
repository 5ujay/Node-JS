// ===============================
// 📦 MongoDB Connection using Mongoose
// ===============================
const mongoose = require("mongoose");

// Get MongoDB URL from .env
const mongodb_url = process.env.mongodbUrl;

// Connect to MongoDB
mongoose.connect(mongodb_url);

// Reference to connection object
const db = mongoose.connection;

// ===============================
// 🔌 Connection Event Listeners
// ===============================

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
