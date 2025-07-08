const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  student_file: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
