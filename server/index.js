const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const { startPeriodicEventGeneration } = require('./controllers/eventController');
// app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
dotenv.config();

//routes

app.use("/user", userRoutes);
app.use("/events", eventRoutes);

//connect
mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;
db.once("open", () => console.log(`Connected to database`));

//listener
const port = 8080;
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

// Add this after your server is initialized but before it starts listening
startPeriodicEventGeneration();
