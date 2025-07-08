// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./auth/passportMiddleware"); // Passport config
require("./db/db"); // Initialize DB connection
const userRoute = require("./routes/userRoute"); // Routes

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize Passport for authentication
app.use(passport.initialize());

// Optional: Local strategy middleware (can be used in specific routes)
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Use user-related routes with base path "/user"
app.use("/user", userRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! JWT learning (Cookies, Session, Token)");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
