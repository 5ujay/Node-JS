const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require("../models/User");
const { jwtAuthMiddleware } = require("../auth/jwt");

// 🛡️ Helper function: Check if a user is an admin by ID (used only if needed)
const checkAdminRole = async (userId) => {
  const user = await User.findById(userId);
  return user && user.role === "admin";
};

// ============================================================
// 📌 POST /api/candidates/
// ✅ Create a new candidate (Admin only)
// ============================================================
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    // Check if the authenticated user is an admin (from token)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Create and save new candidate
    const candidateData = req.body;
    const newCandidate = new Candidate(candidateData);
    const response = await newCandidate.save();

    res.status(201).json({
      message: "Candidate created successfully",
      candidate: response,
    });
  } catch (error) {
    console.error("❌ Error creating candidate:", error);
    res.status(500).json({ message: "Internal server error: POST /candidates" });
  }
});

// ============================================================
// ✏️ PATCH /api/candidates/:candidateId
// ✅ Update candidate info (Admin only)
// ============================================================
router.patch("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    // Check admin from token
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const candidateId = req.params.candidateId;
    const updates = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      updates,
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("❌ Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error: PATCH /candidates/:id" });
  }
});

// ============================================================
// 🗑️ DELETE /api/candidates/:candidateId
// ✅ Delete candidate (Admin only)
// ============================================================
router.delete("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const candidateId = req.params.candidateId;

    const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
      candidate: deletedCandidate,
    });
  } catch (error) {
    console.error("❌ Error deleting candidate:", error);
    res.status(500).json({ message: "Internal server error: DELETE /candidates/:id" });
  }
});

// ============================================================
// 🗳️ POST /api/candidates/vote/:candidateId
// ✅ Cast vote by a voter (only once)
// ============================================================
router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const candidateId = req.params.candidateId;

    const voter = await User.findById(userId);

    if (!voter || voter.role !== "voter") {
      return res.status(403).json({ message: "Only voters can vote" });
    }

    if (voter.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Add vote
    candidate.votes.push({ username: voter._id });
    candidate.voteCount += 1;
    await candidate.save();

    // Update voter status
    voter.isVoted = true;
    await voter.save();

    res.status(200).json({ message: "Vote cast successfully", candidate });
  } catch (error) {
    console.error("❌ Error in voting:", error);
    res.status(500).json({ message: "Internal server error: POST /vote/:candidateId" });
  }
});

// ============================================================
// 📌 GET /api/candidates/
// ✅ Get list of all candidates (Public)
// ============================================================
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ candidates });
  } catch (error) {
    console.error("❌ Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error: GET /candidates" });
  }
});

// ============================================================
// 🏆 GET /api/candidates/leaderboard
// ✅ Get candidates sorted by voteCount (Public)
// ============================================================
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Candidate.find({}, "candidate party voteCount").sort({
      voteCount: -1,
    });

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal server error: GET /leaderboard" });
  }
});

module.exports = router;
