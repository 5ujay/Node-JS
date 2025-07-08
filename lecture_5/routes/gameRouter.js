const express = require("express");
const router = express.Router();
const Game = require("../models/game");

// POST /game
router.post("/", async (req, res) => {
  try {
    const gameData = req.body;
    const newGame = new Game(gameData);
    const response = await newGame.save();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error saving game:", error.message);
    res.status(500).json({ err: "Internal server error - game" });
  }
});

// GET /game
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.find();
    res.status(200).json(gameData);
  } catch (error) {
    console.log("Error fetching game:", error.message);
    res.status(500).json({ err: "Internal server error - game" });
  }
});

// DELETE /game
router.delete("/:id", async (req, res) => {
  try {
    const gameId = req.params.id;

    const deleteGame = await Game.findByIdAndDelete(gameId);

    if (!deleteGame) {
      res.status(404).json({ message: "Game dose not found !" });
    }
    res.status(200).json(deleteGame);
  } catch (error) {
    console.log("Error in deleting game:", error.message);
    res.status(500).json({ err: "Internal server error - game" });
  }
});

module.exports = router;
