const router = require("express").Router();
const app = require("../models/appointment.models");
let Appointment = require("../models/appointment.models");

router.route('/').post(async (req, res)=>{
    try{
        let appointment = await Appointment.findOne({Date: req.body.date, userID: req.body.userID});
        if(!appointment){
            appointment = new Appointment({userID: req.body.userID, status: "waiting", description: "", Date: req.body.date});
            await appointment.save();
            res.json("booked successfully !!!")
        }
        else{
            res.json("already booked!!")
        }
    }
    catch(err){
        console.log(err)
        res.json({
            error: err
        })
    }
    
})
 router.route("/").get(async (req, res)=>{
    res.json(await Appointment.find({Date: "Dec 14 2021"}))
 })

module.exports = router;
