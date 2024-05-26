const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please enter a username"],
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
  otp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
