// const jsonString = `{
// "name":"Alice",
// "age":"25",
// "hobbies":["running","workout","coding"]
// }
// `;
// // console.log(jsonString);

// let jsonObject = JSON.stringify(jsonString);
// console.log(jsonObject);

// jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(jsonObject.name);
// console.log(jsonObject.hobbies);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.get("/books", (req, res) => {
  res.send("This is Books Section");
});

app.get("/games", (req, res) => {
  let game = {
    name: "BGMI",
    device: "Redmi 7",
    optional_device: "I Phone",
    is_console: true,
    is_headset: false,
  };
  res.send(game);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server ruuning on port http://localhost:${PORT}`);
});
