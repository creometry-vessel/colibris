const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected !!!");
});

const markersRouter = require('./routes/markers')

app.use("/marker", markersRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("server is running on port",port);
});