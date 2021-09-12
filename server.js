const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

module.exports = app;
