const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("./db"); // MongoDB connection
const gameRouter = require("./routes/gameRouter");
const playerRouter = require("./routes/playerRoute");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Hello World Routing Learning");
});

// Routes
app.use("/game", gameRouter); // POST /game, GET /game
app.use("/player", playerRouter); // POST /player, GET /player, GET /player/:id/game

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
