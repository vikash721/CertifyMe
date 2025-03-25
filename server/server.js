require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth"); // Import routes

require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to Database
connectDB();

// Routes
app.use("/auth", authRoutes); // Authentication routes

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
