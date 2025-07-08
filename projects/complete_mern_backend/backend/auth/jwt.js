const jwt = require("jsonwebtoken");
require("dotenv").config();

// ==============================
// 🛡️ JWT Authentication Middleware
// ==============================
const jwtAuthMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  // ❗ Token missing from headers
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Token not found!" });
  }

  // 🔍 Expected format: "Bearer <token>"
  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Malformed token format!" });
  }

  const token = parts[1];

  try {
    // ✅ Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attach decoded user data to request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==============================
// 🔑 JWT Token Generator
// ==============================
const generateToken = (userData) => {
  // userData should include: { id, username, role }
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "1h", // ⏰ Token expiry (customizable)
  });
};

module.exports = {
  jwtAuthMiddleware,
  generateToken,
};
