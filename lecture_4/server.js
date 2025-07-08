const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const Menu = require("./models/Menu");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

// Person get post
app.post("/person", async (req, res) => {
  //   const personData = req.body; //when we use post method the alway when client send data tp the server it always constain different formant hence we use body parser middlware to get directly actual data

  //   //   create a new person model using mongoose model
  //   const newPerson = new Person(personData);

  //   //   save the new person in the database
  //   newPerson.save((err, savePerson) => {
  //     if (err) {
  //       console.log(`Error in saving data ${err}`);
  //       res.status(500).json({ err: "Internal server error" });
  //     } else {
  //       console.log("Data saved successfully");
  //       res.status(200).json(savePerson);
  //     }
  //   });

  try {
    const personData = req.body;
    const newPerson = new Person(personData);

    // const savedPerson = await newPerson.save();
    const response = await newPerson.save();
    console.log(`Data saved successfully`);
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error in saving data ${error}`);
    res.status(500).json({ err: "Internal server error" });
  }
});

app.get("/person", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(personData);
  } catch (error) {
    console.log(`Error in saving data ${error}`);
    res.status(500).json({ err: "Internal server error" });
  }
});

// Menu get and post;
app.post("/menu", async (req, res) => {
  try {
    // Step 1: Get data sent by client in request body
    const menuData = req.body;

    // Step 2: Create a new instance of the Menu model
    const newMenu = new Menu(menuData);

    // Step 3: Save the data to MongoDB
    const response = await newMenu.save();

    // Step 4: Send success response back to client
    console.log("✅ Menu item saved successfully");
    res.status(200).json(response);
  } catch (error) {
    // Step 5: Handle any errors during saving
    console.error("❌ Error in saving data:", error);
    res.status(500).json({ err: "Internal server error" });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const menuData = await Menu.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(menuData);
  } catch (error) {
    console.error("❌ Error in saving data:", error);
    res.status(500).json({ err: "Internal server error" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
