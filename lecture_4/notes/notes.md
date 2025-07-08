# 📒 Node.js + Express + MongoDB Notes

## 📁 Project Structure

```
project/
├── db.js                 # MongoDB connection setup
├── models/
│   └── Person.js         # Mongoose model for Person
├── index.js              # Main server file
├── package.json
```

---

## 🔧 Step 1: Initialize Project & Install Dependencies

```bash
npm init -y
npm install express mongoose body-parser
```

---

## 🔌 Step 2: MongoDB Connection (`db.js`)

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

db.on("error", (err) => {
  console.log("❌ MongoDB connection error:", err);
});

module.exports = db;
```

---

## 🧱 Step 3: Create Mongoose Model (`models/Person.js`)

```js
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  work: { type: String, enum: ["chef", "waiter", "manager"], required: true },
  mobile: { type: String },
  email: { type: String, required: true, unique: true },
  address: { type: String },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
```

---

## 🚀 Step 4: Express Server with GET & POST APIs (`index.js`)

```js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const Person = require("./models/Person");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send("🌍 Hello World!");
});

// POST: Add new person
app.post("/person", async (req, res) => {
  try {
    const personData = req.body;
    const newPerson = new Person(personData);
    const response = await newPerson.save();
    console.log("✅ Person saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Get all persons
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("📦 Data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching persons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
```

---

## 🧪 Testing with Postman

### POST `/person`

- **Body**:

```json
{
  "name": "Sujay",
  "age": 25,
  "work": "chef",
  "mobile": "9876543210",
  "email": "sujay@example.com",
  "address": "Pune, Maharashtra"
}
```

### GET `/person`

- Returns list of all persons.

---

## 📝 Summary

- Express used for API creation
- body-parser parses incoming request body
- Mongoose connects and interacts with MongoDB
- GET & POST APIs created for basic CRUD functionality
