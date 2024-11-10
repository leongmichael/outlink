const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// create user
router.post("/createAccount", createUser);

// user login

router.post("/login", loginUser);

module.exports = router;
