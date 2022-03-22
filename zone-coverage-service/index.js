const express = require("express");
const mongoose = require("mongoose");


const { MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER} = require("./config")

const zoneRouter = require("./routes/zoneRoutes")
const eligibilityRouter = require("./routes/eligibilityRoutes")

const app = express()


mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`,
                {useNewUrlParser: true,
                useUnifiedTopology: true,
                })
        .then(()=> console.log("Succesfully connected to DB"))
        .catch((e)=> {
            console.log(e)});
            
       
        
                

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h2>Hi there</h2>")
})

//localhost:3000/zone
app.use("/zone", zoneRouter)
app.use("/eligibility", eligibilityRouter)

const port = process.env.Port || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`))