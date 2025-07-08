const express = require("express");
const Student = require("../models/Student");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "uploads"); // use relative path
//   },
//   filename: (req, file, callback) => {
//     const suffix = Date.now();
//     callback(null, suffix + "-" + file.originalname);
//   },
// });

// configure multer to store files in memory as buffer
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/student", upload.single("student_file"), async (req, res) => {
  try {
    const { name, age, email, year, branch } = req.body;

    // const file_path = req.file ? req.file.path : null;
    const file_path = req.file ? req.file.buffer.toString("base64") : null;

    const newStudent = new Student({
      name,
      age,
      email,
      year,
      branch,
      student_file: file_path,
    });

    const response = await newStudent.save();

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in posting student data:", error);
    res.status(500).json({ message: "Internal server error: POST /student" });
  }
});

module.exports = router;
