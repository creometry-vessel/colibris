const router = require("express").Router();
let Appointment = require("../models/appointment.models");
const axios = require("axios");
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
    res.json(await Appointment.find())
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

 router.route('/').put(async (req, res)=>{
    let newAppointment = await Appointment.findOne({Date: req.body.today, userID: req.body.userID});
    if(newAppointment){
        newAppointment.status = req.body.status;
        newAppointment.message = req.body.message;
        await newAppointment.save();
    }
    let nextApp = await Appointment.findOne({Date: req.body.today, status: "waiting"});
    if(nextApp){
        let user = (await axios.get(env.process.USER_SERVICE_URL+'/'+nextApp.userID)).data
    
        res.json({data: {userID: nextApp.userID, lat: user.addresses[0].lat, lng: user.addresses[0].lng, name: user.Name, phone1: user.phone1,phone2: user.phone2 , address: user.addresses[0].address}})
    }
   else res.json("finished!!")
    
})
module.exports = router;
