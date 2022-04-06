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
        let appointment = await Appointment.findOne({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift, contact: req.body.contact });
        if (!appointment) {
            appointment = new Appointment({
                createdBy: req.body.createdBy,
                status: "pending",
                reason: "",
                dueDate: new Date(new Date(req.body.dueDate).getTime() + 60 * 60 * 1000),
                location: req.body.location,
                shift: req.body.shift,
                contact: req.body.contact,
                waypointRank: -1,
                attempts: 0
            });
            await appointment.save();
            res.json("booked successfully !!!")
        } else {
            res.json("already booked!!")
        }
    } catch (err) {
        res.json({
            error: err
        })
    }

})
router.route("/").get(async(req, res) => {
    let filter = {};
    if (req.query.shift) filter.shift = req.query.shift;
    if (req.query.dueDate) filter.dueDate = req.query.dueDate;
    if (req.query.status) filter.status = req.query.status;
    let appointments = await Appointment.find(filter);
    let result = [];
    for (let appointment of appointments) {
        let location = await axios.get(`${process.env.USER_SERVICE_URL}/location/${appointment.location}`);
        result.push({...appointment._doc, location: location.data })
    }
    res.json(result);
})

router.route("/:userID").get(async(req, res) => {
    try {
        let result = []
        let appointments = await Appointment.find({ $or: [{ createdBy: req.params.userID }, { contact: req.params.userID }] });
        for (let appointment of appointments) {
            let location = await axios.get(`${process.env.USER_SERVICE_URL}/location/${appointment.location}`);
            result.push({...appointment._doc, location: location.data })
        }
        res.json(result);
    } catch (err) {
        res.json({ error: err })
    }
})

router.route("/").delete(async(req, res) => {
    await Appointment.findByIdAndDelete(req.body.id)
    res.json("deleted")
})

router.route('/markers').put(async(req, res) => {
    let newAppointment = await Appointment.findOne({ date: req.body.today, userID: req.body.userID });
    if (newAppointment) {
        newAppointment.status = req.body.status;
        newAppointment.description = req.body.description;
        await newAppointment.save();
    }
    let nextApp = await Appointment.findOne({ date: req.body.today, status: "waiting" });
    if (nextApp) {
        let user = (await axios.get(process.env.USER_SERVICE_URL + '/' + nextApp.userID)).data

        res.json({
            data: {
                userID: nextApp.userID,
                lat: nextApp.address.lat,
                lng: nextApp.address.lng,
                name: user.Name,
                phone1: user.phone1,
                phone2: user.phone2,
                street: nextApp.address.street,
                city: nextApp.address.city,
                governorate: nextApp.address.governorate
            }
        })
    } else res.json("finished!!")

})

router.route('/:id').put(async(req, res) => {
    let appointments = await Appointment.find({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift });
    if (appointments.length >= parseInt(process.env.MAX_APPS)) {
        res.json("full for today")
        return;
    }
    let appointment = await Appointment.findOne({ dueDate: req.body.dueDate, location: req.body.location, shift: req.body.shift, contact: req.body.contact });
    if (!appointment) {
        await Appointment.findByIdAndUpdate(req.params.id, req.body);
        res.json("Changed Successfully !")
    } else res.json("already booked")
})
module.exports = router;