const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// GET todo
router.get("/", async (req, res) => {
  try {
    const todoData = await Todo.find();
    res.status(200).json(todoData);
  } catch (error) {
    console.log(`Error in fecthing todo data: `, error);
    res.status(500).json({ message: "Internal Server Error :- getTodo" });
  }
});

// POST todo
router.post("/", async (req, res) => {
  try {
    const todoData = req.body;
    const newTodo = new Todo(todoData);
    const response = await newTodo.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error in posting todo data: `, error);
    res.status(500).json({ message: "Internal Server Error :- postTodo" });
  }
});

// PUT todo
router.put("/:id", async (req, res) => {
  try {
    const todoData = req.body;
    const todoId = await Todo.findById(req.params.id);
    const response = await Todo.findByIdAndUpdate(todoId, todoData, {
      new: true, // return and update the document
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      res.status(404).json({ message: "Todo Not Found !" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error in putting todo data: `, error);
    res.status(500).json({ message: "Internal Server Error :- putTodo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const todoId = await Todo.findById(req.params.id);
    const response = await Todo.findByIdAndDelete(todoId);
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error in deleting todo data: `, error);
    res.status(500).json({ message: "Internal Server Error :- deleteTodo" });
  }
});

module.exports = router;
