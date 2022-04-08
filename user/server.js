const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const userRouter = require('./routes/user')
const locationRouter = require('./routes/location')

app.use("/location", locationRouter)
app.use("/", userRouter)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected !!!");
});

app.listen(port, () => {
  console.log("server is running on port",port);
});
