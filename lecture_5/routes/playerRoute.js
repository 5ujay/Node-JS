const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// POST /player
router.post("/", async (req, res) => {
  try {
    const playerData = req.body;
    const newPlayer = new Player(playerData);
    const response = await newPlayer.save();
    res.status(200).json(response);
  } catch (error) {
    console.log("Error saving player:", error.message);
    res.status(500).json({ err: "Internal server error - player" });
  }
});

// GET /player
router.get("/", async (req, res) => {
  try {
    const playerData = await Player.find();
    res.status(200).json(playerData);
  } catch (error) {
    console.log("Error fetching player:", error.message);
    res.status(500).json({ err: "Internal server error - player" });
  }
});

// GET /player/:id/game
router.get("/:id/game", async (req, res) => {
  try {
    const playerIdData = await Player.findById(req.params.id).populate(
      "favoriteGame"
    );

    if (!playerIdData) {
      return res.status(404).json({ message: "Player Not Found!" });
    }

    res.status(200).json({
      player: playerIdData.name,
      age: playerIdData.age,
      favoriteGame: playerIdData.favoriteGame,
    });
  } catch (error) {
    console.error("Error fetching player:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const playerData = req.body;
    const playerId = await Player.findById(req.params.id);

    const response = await Player.findByIdAndUpdate(playerId, playerData, {
      new: true, // return and update the document
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      res.status(404).json({ message: "Player Not Found !" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updating player:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
