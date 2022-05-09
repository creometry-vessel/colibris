const router = require("express").Router();
let Appointment = require("../models/appointment.models");
const axios = require("axios");


router.route('/').post(async(req, res) => {
    try {
        let appointments = await Appointment.find({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift });
        if (appointments.length >= parseInt(process.env.MAX_APPS)) {
            res.json("full for today")
            return;
        }
        let appointment = await Appointment.findOne({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift });
        if (!appointment) {
            appointment = new Appointment({
                createdBy: req.body.createdBy,
                status: "pending",
                reason: "",
                dueDate: req.body.dueDate,
                location: req.body.location,
                shift: req.body.shift,
                waypointRank: -1,
                attempts: 0
            });
            await appointment.save();
            res.json("booked successfully !!!")
        } else {
            res.json("already booked!!")
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: e.message
        })
    }

})

router.route("/sort").put(async (req,res)=>{
    if(!req.body.shift || !req.body.dueDate){
        res.status(500).json({
            status: "error",
            message: "need shift and dueDate"
          })
        return;
    }
    let locations = []
    let destinations = ""
    let indexes = [0];
    let currentIndex = 0;
    //fetch info
    try{
    let appointments = await Appointment.find({shift: req.body.shift, dueDate: req.body.dueDate});
    if(appointments.length == 0) {
        res.json({data: "no Appointments today"})
        return;
    }
    for (let appointment of appointments) {
        let location = await axios.get(`${process.env.USER_SERVICE_URL}/location/${appointment.location}`);
        destinations = `${destinations}|${location.data.address.lat},${location.data.address.lng}`
        locations.push(location.data )
    }

    //send data to matrix API
    let response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${destinations}&destinations=${destinations}&key=${process.env.GOOGLE_API_KEY}`);
    //organize appointments
    while(indexes.length != appointments.length){
        let myDistance = 0 ;
        let elements = response.data.rows[currentIndex].elements;
        //get max distance
        for(let k = 0; k <elements.length; k++){
            if(elements[k].distance.value>= myDistance){
                myDistance = elements[k].distance.value;
            }
        }
        //search for min distance
        let ind ;
        for(let j = 0; j < elements.length; j++){
            if(elements[j].distance.value <= myDistance && indexes.indexOf(j) == -1){
                myDistance = elements[j].distance.value;
                ind = j;
            }
        }
        //go to next spot
        indexes.push(ind)
        currentIndex = ind;
    }
    //rank Appointments
    for(let i = 0; i < indexes.length; i++){
        appointments[i].waypointRank = indexes[i] + 1;
        await appointments[i].save();
    }
    res.json({data: "succeeded"})
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
          })
    }
})

router.route("/").get(async(req, res) => {
    let filter = {};
    if (req.query.shift) filter.shift = req.query.shift;
    if (req.query.dueDate) filter.dueDate = req.query.dueDate;
    if (req.query.status) filter.status = req.query.status;
    try{
    let appointments = await Appointment.find(filter).sort({dueDate: 1, waypointRank: 1});
    let result = [];
    for (let appointment of appointments) {
        let location = await axios.get(`${process.env.USER_SERVICE_URL}/location/${appointment.location}`);
        if(location)
        result.push({...appointment._doc, location: location.data })
    }
    res.json(result);
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
        })
    }
})

router.route("/:userID").get(async(req, res) => {
    try {
        let result = []
        let appointments = await Appointment.find({ createdBy: req.params.userID });
        for (let appointment of appointments) {
            let location = await axios.get(`${process.env.USER_SERVICE_URL}/location/${appointment.location}`);
            result.push({...appointment._doc, location: location.data })
        }
        res.json(result);
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
          })
    }
})

router.route("/").delete(async(req, res) => {
    try{
    await Appointment.findByIdAndDelete(req.body.id)
    res.json("deleted")
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
          })
    }
})

router.route('/markers').put(async(req, res) => {
    try{
    let search = { dueDate: new Date(new Date().setHours(0, 0 , 0, 0)), status: "pending", shift: new Date().getHours() >= 14 ?  "afternoon" : "morning",  waypointRank: { $gte: 1 } };
    let newAppointment = await Appointment.findById(req.body.appointment?._id);
    if (newAppointment) {
        newAppointment.attempts = newAppointment.attempts + 1
        newAppointment.status = req.body.status;
        newAppointment.reason = req.body.reason;
        await newAppointment.save();
    }
    let apps = await Appointment.find(search).sort({waypointRank: 1});
    nextApp = apps[0];
    if (nextApp) {
        let location = (await axios.get(process.env.USER_SERVICE_URL + '/location/' + nextApp.location)).data
        res.json({
            data: {
                _id: nextApp._id,
                userID: nextApp.userID,
                lat: location.address.lat,
                lng: location.address.lng,
                name: location.userID.name,
                phone1: location.userID.phone1,
                phone2: location.userID.phone2,
                streetName: location.address.streetName,
                city: location.address.city,
                state: location.address.state,
                addressType: location.address.addressType,
                locationType: location.address.locationType,
                streetNumber: location.address.streetNumber,
                zipCode: location.address.zipCode
            }
        })
    } else res.json("finished!!")
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
          })
    }
})

router.route('/:id').put(async(req, res) => {
    try{
        let appointments = await Appointment.find({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift });
        if (appointments.length >= parseInt(process.env.MAX_APPS)) {
            res.json("full for today")
            return;
        }
        let appointment = await Appointment.findOne({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift, createdBy: req.body.createdBy});
        if (!appointment) {
            await Appointment.findByIdAndUpdate(req.params.id,req.body);
            res.json("Changed Successfully !")
        } else res.json("already booked")
    }
    catch(e){
        res.status(500).json({
            status: "error",
            message: e.message
          })
    }
})


module.exports = router;