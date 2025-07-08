const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadharCardNumber: { type: Number, required: true },
  role: { type: String, enum: ["voter", "admin"], default: "Voter" },
  isVoted: { type: Boolean, default:false },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  user.password = hashPassword;
  next();
});

// 🔐 Compare entered password with hashed password
userSchema.methods.comparePass = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
