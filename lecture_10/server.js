const express = require("express");
const app = express();

require("dotenv").config();
require("./db/db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server is running: image upload learning");
});

const studentRoute = require("./routes/studentRoute");
app.use("/", studentRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
