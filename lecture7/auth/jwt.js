const jwt = require("jsonwebtoken");
require("dotenv").config();

// JWT Auth Middleware
const jwtAuthMiddleware = (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  // If no Authorization header
  if (!authorizationToken) {
    return res.status(401).json({ message: "Token Not Found!" });
  }

  // Extract token from "Bearer <token>"
  const token = authorizationToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user to request
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Generate Token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { jwtAuthMiddleware, generateToken };
