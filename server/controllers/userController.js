const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Checking for user:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found in DB");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret missing in environment variables" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error, please try again" });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Registering user:", email);
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists in DB");
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT Secret missing in environment variables" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Registration successful", token });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error, please try again" });
  }
};