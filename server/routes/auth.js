const express = require("express");
const { loginUser } = require("../controllers/userController"); // Import controller

const router = express.Router();

router.post("/login", loginUser); // Use loginUser function

module.exports = router;
