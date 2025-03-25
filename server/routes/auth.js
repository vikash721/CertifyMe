const express = require("express");
const { loginUser, registerUser } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);

module.exports = router;
