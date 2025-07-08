const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Hash password only if it is new or modified
  if (!user.isModified("password")) return next();

  try {
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
    return await bcrypt.compare(user_pass, this.password);
  } catch (error) {
    throw new Error("Error comparing password in userSchema: " + error.message);
  }
};

module.exports = mongoose.model("User", userSchema);
