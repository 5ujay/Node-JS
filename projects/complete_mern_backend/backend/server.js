const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./db/db");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
const userRoute = require("./routes/userRoute");
const candidateRoute = require("./routes/candidateRoute");

app.use("/api/user", userRoute);
app.use("/api/candidates", candidateRoute);

// Root route (optional)
app.get("/", (req, res) => {
  res.send("🗳️ Voting App Backend is Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
