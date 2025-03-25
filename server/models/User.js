const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // Allow users to login via Google
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // Required only for local login
});

module.exports = mongoose.model("Usered", UserSchema);
