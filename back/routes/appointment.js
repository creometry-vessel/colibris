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

 router.route("/:userID").get(async (req, res)=>{
    let all = await Appointment.find({userID: req.params.userID});
    let current = [];
    let ancient = [];
    for(let app of all){
        if(app.status == "waiting") current.push(app);
        else ancient.push(app)
    }
    res.json({ancient: ancient, current: current});
 })

 router.route("/").delete(async (req, res)=>{
     await Appointment.findByIdAndDelete(req.body.id)
     res.json("deleted")
 })
module.exports = router;
