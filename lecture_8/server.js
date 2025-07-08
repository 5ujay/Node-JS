// Load environment variables from .env file
require("dotenv").config();

// ===============================
// 📦 Express App Initialization
// ===============================
const express = require("express");
const app = express();

// ===============================
// 🧰 Database Setup
// ===============================
require("./db/db");

// ===============================
// 🧰 Middleware Setup
// ===============================
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON request bodies

// ===============================
// 🔗 Routes Setup
// ===============================
const userRoute = require("./routes/userRoute");
const candidateRoute = require("./routes/candidateRoute");
app.use("/user", userRoute);
app.use("/candidate", candidateRoute);

// ===============================
// 🚀 Basic Server Route
// ===============================
app.get("/", (req, res) => {
  res.send("Hello World! Complete Voting App Backend Learnings");
});

// ===============================
// ✅ Server Startup
// ===============================
const PORT = process.env.portNumber || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
