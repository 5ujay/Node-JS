const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// ✅ Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash password only if it is new or modified
  if (!user.isModified("password")) return next();

  try {
    // password hashing

    // salt
    const salt = await bcrypt.genSalt(10);

    // hash pass
    const hashPass = await bcrypt.hash(user.password, salt);

    // override the plain password in the db
    user.password = hashPass;

    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePass = async function (user_pass) {
  try {
    // compare the password here
    const isMatch = await bcrypt.compare(user_pass, this.password);
    return isMatch;
  } catch (error) {
    throw new Error("Error is comparing pass in userSchma: ", error);
  }
};

module.exports = mongoose.model("User", userSchema);
