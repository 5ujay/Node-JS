const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("./db/db");

const todoRouter = require("./routes/todoRoute");

app.get("/", (req, res) => {
  res.send("Server is ruuning get start with your code");
});

app.use("/todo", todoRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
