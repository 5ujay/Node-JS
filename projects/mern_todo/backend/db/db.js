const mongoose = require("mongoose");

const mongodb_url = "mongodb://localhost:27017/todolist_database";

// Connect to MongoDB
mongoose.connect(mongodb_url);

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on("connected", () => {
  console.log("✅ Database Connected Successfully");
});

db.on("disconnected", () => {
  console.log("❌ Database Disconnected");
});

db.on("error", (err) => {
  console.error("❌ Connection Error:", err);
});
