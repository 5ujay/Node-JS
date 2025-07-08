const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  candidate: { type: String, required: true },
  age: { type: Number, required: true },
  party: { type: String, required: true },
  votes: [
    {
      username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      votedAt: { type: Date, default: Date.now() },
    },
  ],
  voteCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Candidate", candidateSchema);
