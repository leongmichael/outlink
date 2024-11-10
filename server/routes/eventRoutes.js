const express = require("express");
const {
  createEvent,
  getEvent,
  randomEvent,
  getEventIdsByDate,
  getEventsByDateRange,
} = require("../controllers/eventController");

const router = express.Router();

// create event
router.post("/createEvent", createEvent);

// get event info
router.post("/getEvent", getEvent);

// delete event
router.get("/randomEvent", randomEvent);

router.post("/eventIdsByDate", getEventIdsByDate);

// get events for 5-day range
router.post("/getEventsByDateRange", getEventsByDateRange);

// modify event

module.exports = router;
