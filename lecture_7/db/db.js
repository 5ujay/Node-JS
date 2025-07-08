const { default: mongoose } = require("mongoose");
const mongodb_url = "mongodb://localhost:27017/jwtlearn_database";

mongoose.connect(mongodb_url);
const db = mongoose.connection;

db.on("connect", () => {
  console.log("Connected to database successfully");
});

db.on("diconnect", () => {
  console.log("Dis-connected to database successfully");
});

db.on("error", () => {
  console.log("Error in connecting database");
});
