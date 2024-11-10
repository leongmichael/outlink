const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    date: { type: Date, required: true }, // date + time
    eventManager: { type: String, required: false },
    ageRange: { type: String, required: true },
    users: { type: [String], required: false }, // user ids
  },
  { collection: "Events" }
);

var eventsModel = mongoose.model("Events", eventsSchema);

module.exports = eventsModel;
