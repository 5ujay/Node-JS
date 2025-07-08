const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // ✅ Make sure bcrypt is imported

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  aadharCardNumber: {
    type: String, // ✅ should be String to preserve 12-digit format
    required: true,
  },
  role: { type: String, enum: ["voter", "admin"], default: "voter" },
  isVoted: { type: Boolean, default: false },
});

// ✅ Password comparison method
userSchema.methods.comparePass = async function (user_pass) {
  try {
    return await bcrypt.compare(user_pass, this.password);
  } catch (error) {
    throw new Error("Error comparing password in userSchema: " + error.message);
  }
};

// ✅ Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Fix: Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
