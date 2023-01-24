const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const morganBody = require('morgan-body')
const CsbInspector = require('csb-inspector');



require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
morganBody(app);
CsbInspector();

app.listen(port, console.log("Server is ON"));

module.exports = { app };