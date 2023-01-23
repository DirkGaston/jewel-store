const express = require("express");
const app = express();
const morgan = require("morgan");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.listen(port, console.log("Server is ON"));

module.exports = { app };