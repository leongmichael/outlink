const express = require("express");
const {
  createEvent,
  getEvent,
  randomEvent,
  getEventIdsByDate,
} = require("../controllers/eventController");

const router = express.Router();

// create event
router.post("/createEvent", createEvent);

// get event info
router.post("/getEvent", getEvent);

// delete event
router.get("/randomEvent", randomEvent);

router.post("/eventIdsByDate", getEventIdsByDate);

// modify event

module.exports = router;
