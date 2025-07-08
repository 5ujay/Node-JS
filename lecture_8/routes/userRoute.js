const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../auth/jwt");

// =============================
// 📌 Route: POST /signup
// ✅ Register a new user
// =============================
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;

    // Create new user instance from request body
    const newUser = new User(userData);

    // Save user to DB
    const response = await newUser.save();

    // Generate JWT token with user payload
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);

    // Respond with user data and token
    res.status(200).json({ response, token });
  } catch (error) {
    console.error("❌ Error in posting user data:", error);
    res.status(500).json({ message: "Internal server error: POST /signup" });
  }
});

// =============================
// 📌 Route: POST /login
// ✅ Login user with Aadhar & Password
// =============================
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    // Find user by Aadhar number
    const user = await User.findOne({ aadharCardNumber });

    // If user not found or password is incorrect
    if (!user || !(await user.comparePass(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user ID
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Error in user login:", error);
    res.status(500).json({ message: "Internal server error: POST /login" });
  }
});

// =============================
// 📌 Route: GET /profile
// ✅ Get authenticated user's profile
// =============================
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user by ID from token payload
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error in fetching user profile:", error);
    res.status(500).json({ message: "Internal server error: GET /profile" });
  }
});

// =============================
// 📌 Route: PUT /profile/password
// ✅ Update user's password
// =============================
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token
    const { currentPassword, newPassword } = req.body;

    // Find user by ID
    const user = await User.findById(userId);

    // Validate current password
    if (!user || !(await user.comparePass(currentPassword))) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Update password and save
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("❌ Error in updating password:", error);
    res
      .status(500)
      .json({ message: "Internal server error: PUT /profile/password" });
  }
});

module.exports = router;
