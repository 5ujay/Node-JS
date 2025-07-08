const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("./db/db");
const userRouter = require("./routes/userRouter");
const passport = require("./auth/userAuth");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.use(passport.initialize());

// Optional: if using sessions
// app.use(passport.session());

// Routes
app.use("/user",localAuthMiddleware, userRouter);

app.get("/", (req, res) => {
  res.send("Hello World! Authentication and Authorization Learning");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
