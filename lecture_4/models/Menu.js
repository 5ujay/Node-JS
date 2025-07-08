const { default: mongoose } = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Pizza", "Main Course", "Dessert", "Drinks", "Snacks"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  ingredients: {
    type: [String], // array of strings
    required: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
});

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;
