const router = require("express").Router();
let marker = require("../models/markers.models");
let Appointment = require("../models/appointment.models")
const axios = require("axios")
router.route('/').post((req, res)=>{
    const mark = new marker({...req.body, status: "waiting", description: ""});
    mark.save().then(()=>{
        res.json({data: "marker added !!!"})
    })
})

router.route('/').get(async (req, res)=>{
    let mark = JSON.parse(req.query.marker)
    if(req.query.status !== 'undefined'){
        let newMark = await marker.findById(mark._id)
        newMark.status = req.query.status;
        if(newMark.status == "error"){
            newMark.description = req.query.description;
        }
        await newMark.save();
    }
    marker.findOne({status: "waiting"}).then(marker=>{
        res.json({data: marker})
    })
    
})

router.route('/').put(async (req, res)=>{
    console.log(req.body)
    let newAppointment = await Appointment.findOne({Date: req.body.today, userID: req.body.userID});
    if(newAppointment){
        newAppointment.status = req.body.status;
        newAppointment.message = req.body.message;
        await newAppointment.save();
    }
    let nextApp = await Appointment.findOne({Date: req.body.today, status: "waiting"});
    console.log(nextApp)
    if(nextApp){
        let user = (await axios.get("http://localhost:5001/"+nextApp.userID)).data
    
        res.json({data: {userID: nextApp.userID, lat: user.addresses[1], lng: user.addresses[2], name: user.Name, phone: user.phone1 , address: user.addresses[0]}})
    }
   else res.json("finished!!")
    
})
module.exports = router;
