const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../auth/jwt");

// ============================================================
// 📌 Route: POST /signup
// ✅ Register a new user (voter or admin)
// ============================================================
router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;

    // 🔐 Create a new User instance
    const newUser = new User(userData);

    // 💾 Save user to MongoDB
    const response = await newUser.save();

    // 🔑 Generate JWT token with id, username, and role
    const payload = {
      id: response._id,
      username: response.username,
      role: response.role,
    };
    const token = generateToken(payload);

    res.status(200).json({ response, token });
  } catch (error) {
    console.error("❌ Error in signup:", error);
    res.status(500).json({ message: "Internal server error: POST /signup" });
  }
});

// ============================================================
// 📌 Route: POST /login
// ✅ Login user using Aadhar number and password
// ============================================================
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    // 🔎 Find user by Aadhar number
    const user = await User.findOne({ aadharCardNumber });

    // ❌ User not found or invalid password
    if (!user || !(await user.comparePass(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token with user info
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Internal server error: POST /login" });
  }
});

// ============================================================
// 📌 Route: GET /profile
// ✅ Get current authenticated user's profile
// ============================================================
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔍 Find user using ID from decoded token
    const user = await User.findById(userId).select("-password"); // Don't send hashed password

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error: GET /profile" });
  }
});

// ============================================================
// 📌 Route: PUT /profile/password
// ✅ Update user password securely
// ============================================================
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // 🔍 Find user
    const user = await User.findById(userId);

    // ❌ If current password doesn't match
    if (!user || !(await user.comparePass(currentPassword))) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // ✅ Update password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save(); // ❗ FIXED: Should be user.save(), not User.save()

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating password:", error);
    res
      .status(500)
      .json({ message: "Internal server error: PUT /profile/password" });
  }
});

module.exports = router;
