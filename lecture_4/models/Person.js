const { mongoose } = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  work: { type: String, enum: ["chef", "waiter", "manager"], required: true },
  mobile: { type: String, required: false },
  email: { type: String, require: true, unique: true },
  address: { type: String, required: false },
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
