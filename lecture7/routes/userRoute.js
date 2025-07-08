const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../auth/jwt");

// user POST
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const response = await newUser.save();

    // gen token while signup user
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);

    // final response with token
    res.status(200).json({ response, token: token });
  } catch (error) {
    console.log("Error in posting user data :", error);
    res.status(500).json({ message: "Internal server error: POST/signup" });
  }
});

// user Login POST
router.post("/login", async (req, res) => {
  try {
    // Extract the username and password
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username: username });

    // If user doesn't exist or password is incorrect
    if (!user || !(await user.comparePass(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    // Final response with token
    res.status(200).json({ token: token });
  } catch (error) {
    console.log("Error in user login:", error);
    res.status(500).json({ message: "Internal server error: POST /login" });
  }
});

// user Profile GET
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userProfileData = req.user;
    console.log("userProfileData :", userProfileData);

    const userId = userProfileData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in user login profile:", error);
    res.status(500).json({ message: "Internal server error: GET /profile" });
  }
});

// user GET
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in fetching user data :", error);
    res.status(500).json({ message: "Internal server error: GET" });
  }
});

module.exports = router;
