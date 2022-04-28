const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const { MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER} = require("./config")

const zoneRouter = require("./routes/zoneRoutes")
const eligibilityRouter = require("./routes/eligibilityRoutes")

const app = express()

mongoose.connect(`mongodb://localhost:27017/Colibris`,
                {useNewUrlParser: true,
                useUnifiedTopology: true,
                })
        .then(()=> console.log("Succesfully connected to DB"))
        .catch((e)=> {
            console.log(e)});
                   

app.use(express.json());
app.use(cors());
app.use("/zone", zoneRouter)
app.use("/eligibility", eligibilityRouter)

const port = process.env.Port || 5002;

app.listen(port, ()=> console.log(`listening on port ${port}`))