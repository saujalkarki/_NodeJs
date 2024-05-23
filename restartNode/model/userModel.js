const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please enter an Email"],
  },
  userEmail: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
  },
  userPassword: {
    type: String,
    required: [true, "Enter a Strong Password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
