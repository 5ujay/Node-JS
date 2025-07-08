const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST / user;
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const response = await newUser.save();
    console.log("✅ User data saved successfully");
    res.status(201).json(response);
  } catch (error) {
    console.log("Error is saving user", error.message);
    res.status(500).json({ error: "Internal server error - user post method" });
  }
});

// GET/user
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.status(200).json(users); // send response
  } catch (error) {
    console.log("Error in fetching user", error.message);
    res.status(500).json({ error: "Internal server error - user get method" });
  }
});

module.exports = router;
