const express = require("express");
const { loginUser, registerUser } = require("../controllers/userController");
const passport = require("passport");
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/issuer-dashboard"); // Redirect to frontend dashboard
  }
);

module.exports = router;
