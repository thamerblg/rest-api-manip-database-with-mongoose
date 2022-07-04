const mongoose = require("mongoose");

// Define a mongoose Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  hobbies: [String],
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
