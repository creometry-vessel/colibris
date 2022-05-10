const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const Zone = require('./models/zoneModel')

const { MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER} = require("./config")

const zoneRouter = require("./routes/zoneRoutes")
const eligibilityRouter = require("./routes/eligibilityRoutes");

const app = express()

mongoose.connect(process.env.MONGO_URI,
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

function createZone(Zone) {
    let weekdays = [
        { weekday: "Lundi",
            zones: []
        },
        { weekday: "Mardi",
            zones: []
        },
        { weekday: "Mercredi",
            zones: []
        },
        {
            weekday: "Jeudi",
            zones: []
        },
        {
            weekday: "Vendredi",
            zones: []
        },
        {
            weekday: "Samedi",
            zones: []
        },
        {
            weekday: "Dimanche",
            zones: []
        }
    ]
     Zone.create(weekdays, (error) => {
            if(error){
                console.log(error)
            }
            else{
                console.log("weekdays created")
            }
        })
};
createZone(Zone);
