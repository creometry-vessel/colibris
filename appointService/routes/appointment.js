const router = require("express").Router();
let Appointment = require("../models/appointment.models");
const axios = require("axios");
router.route('/').post(async (req, res)=>{
    try{
        let appointment = await Appointment.findOne({date: req.body.date, userID: req.body.userID, address: req.body.address});
        if(!appointment){
            appointment = new Appointment({userID: req.body.userID, status: "waiting", description: "", date: req.body.date, address: req.body.address});
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

 /*router.route('/').put(async (req, res)=>{
    let newAppointment = await Appointment.findOne({date: req.body.today, userID: req.body.userID});
    if(newAppointment){
        newAppointment.status = req.body.status;
        newAppointment.description = req.body.description;
        await newAppointment.save();
    }
    let nextApp = await Appointment.findOne({date: req.body.today, status: "waiting"});
    if(nextApp){
        let user = (await axios.get(process.env.USER_SERVICE_URL+'/'+nextApp.userID)).data
    
        res.json({data: 
            {
                userID: nextApp.userID,
                lat: nextApp.address.lat, 
                lng: nextApp.address.lng, 
                name: user.Name, 
                phone1: user.phone1,
                phone2: user.phone2 , 
                street: nextApp.address.street, 
                city:  nextApp.address.city, 
                governorate:  nextApp.address.governorate
            }})
    }
   else res.json("finished!!")
    
})*/

router.route('/').put(async (req, res)=>{
    let app = await Appointment.findById(req.body.id);
    let app2 = await Appointment.findOne({
        date: req.body.date? req.body.date : app.date ,
        address: req.body.address? req.body.address : app.address,
        userID : req.body.userID
    })
    if(! app2){
        app.date = req.body.date? req.body.date : app.date;
        app.address = req.body.address? req.body.address : app.address;
        app.status = req.body.status? req.body.status : app.status;
        app.description = req.body.description? req.body.description : app.description;
        app.save().then(()=> res.json("Changed Successfully !"))
    } 
    else res.json("already booked")
})
module.exports = router;
