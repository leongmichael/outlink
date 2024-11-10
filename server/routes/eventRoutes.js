const express = require("express");
const { createEvent, getEvent } = require("../controllers/eventController");

const router = express.Router();

// create event
router.post("/createEvent", createEvent);

// get event info
router.post("/getEvent", getEvent);

// delete event

// modify event

module.exports = router;
