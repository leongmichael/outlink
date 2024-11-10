const express = require("express");
const { createUser } = require("../controllers/userController");

const router = express.Router();

// create user
router.post("/createAccount", createUser);

// create event

module.exports = router;
