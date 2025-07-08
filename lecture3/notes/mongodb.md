# Save the Markdown content as a README.md file

markdown_content = """
# 📘 MongoDB Shell Commands - Quick Reference

This is a complete guide to essential MongoDB shell commands for beginners and developers.

---

## 📁 DATABASE COMMANDS

| Command                          | Description                          |
|----------------------------------|--------------------------------------|
| `show dbs` / `show databases`    | List all databases                   |
| `use <dbName>`                   | Switch to or create a new database   |
| `db`                             | Show current database                |
| `db.dropDatabase()`              | Delete the current database          |

---

## 📂 COLLECTION COMMANDS

| Command                                    | Description                        |
|--------------------------------------------|------------------------------------|
| `show collections`                         | List all collections in current DB |
| `db.createCollection("collectionName")`    | Create a new collection            |
| `db.collectionName.drop()`                 | Delete a collection                |

---

## 📄 INSERT DOCUMENTS

| Command                                                   | Description         |
|------------------------------------------------------------|---------------------|
| `db.collection.insertOne({ key: value })`                 | Insert one document |
| `db.collection.insertMany([{...}, {...}])`                | Insert many docs    |

**Example:**
\`\`\`js
db.users.insertOne({ id: 1, name: "user1", email: "user1@gmail.com" });
\`\`\`

---

## 🔎 QUERY DOCUMENTS

| Command                                     | Description                  |
|---------------------------------------------|------------------------------|
| `db.collection.find()`                      | Find all documents           |
| `db.collection.find({ key: value })`        | Find specific documents      |
| `db.collection.findOne({ key: value })`     | Find a single document       |

**Example:**
\`\`\`js
db.users.find({ name: "user1" });
\`\`\`

---

## ✏️ UPDATE DOCUMENTS

| Command                                                              | Description         |
|----------------------------------------------------------------------|---------------------|
| `db.collection.updateOne({filter}, { $set: { key: value } })`        | Update one document |
| `db.collection.updateMany({filter}, { $set: { key: value } })`       | Update many docs    |
| `db.collection.replaceOne({filter}, { newDoc })`                     | Replace a document  |

**Example:**
\`\`\`js
db.users.updateOne({ name: "user1" }, { $set: { email: "new@email.com" } });
\`\`\`

---

## ❌ DELETE DOCUMENTS

| Command                                      | Description              |
|----------------------------------------------|--------------------------|
| `db.collection.deleteOne({ key: value })`     | Delete one document      |
| `db.collection.deleteMany({ key: value })`    | Delete multiple docs     |

**Example:**
\`\`\`js
db.users.deleteOne({ name: "user1" });
\`\`\`

---

## 🧮 COUNT & SORT

| Command                                    | Description                       |
|--------------------------------------------|-----------------------------------|
| `db.collection.countDocuments()`           | Count documents                   |
| `db.collection.find().sort({ key: 1 })`    | Sort ascending                    |
| `db.collection.find().sort({ key: -1 })`   | Sort descending                   |
| `db.collection.find().limit(n)`            | Limit number of results           |

---

## 🧪 QUERY FILTER OPERATORS

| Operator | Example                            | Meaning                     |
|----------|-------------------------------------|-----------------------------|
| `$gt`    | `{ age: { $gt: 18 } }`              | Greater than                |
| `$lt`    | `{ age: { $lt: 30 } }`              | Less than                   |
| `$gte`   | `{ age: { $gte: 18 } }`             | Greater than or equal       |
| `$lte`   | `{ age: { $lte: 30 } }`             | Less than or equal          |
| `$ne`    | `{ name: { $ne: "John" } }`         | Not equal                   |
| `$in`    | `{ age: { $in: [20, 25, 30] } }`    | Matches any in the array    |

---

## ✅ Example Workflow

\`\`\`js
use mydb                              // Switch to database
db.createCollection("users")         // Create collection

db.users.insertOne({
  id: 1,
  name: "user1",
  email: "user1@gmail.com",
  password: "user@123"
})                                   // Insert a document

db.users.find({ name: "user1" })     // Find user by name

db.users.updateOne(
  { id: 1 },
  { $set: { email: "new@mail.com" } }
)                                    // Update document

db.users.deleteOne({ id: 1 })        // Delete document
\`\`\`

---

> 📝 
