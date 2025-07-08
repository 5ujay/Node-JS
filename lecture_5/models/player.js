const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
