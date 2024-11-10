// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import morgan from "morgan";

// import userRoutes from "./routes/userRoutes.js";

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");

// app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
dotenv.config();

//routes
app.use("/", userRoutes);

//connect
mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;
db.once("open", () => console.log(`Connected to database`));

//listener
const port = 8080;
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
