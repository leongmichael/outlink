const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema(
  {
    location: { type: String, required: true },
    date: { type: Date, required: true }, // date + time
    eventManager: { type: String, required: false },
    ageRange: { type: String, required: true },
    users: [{ type: [Number], required: true }], // user ids
  },
  { collection: "Events" }
);

var EventsModel = mongoose.model("Events", eventsSchema);

module.exports = EventsModel;
