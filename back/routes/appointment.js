const router = require("express").Router();
const app = require("../models/appointment.models");
let Appointment = require("../models/appointment.models");

router.route('/').post(async (req, res)=>{
    try{
        let appointment = await Appointment.findOne({Date: req.body.date});
        if(!appointment){
            appointment = new Appointment({
                Date: req.body.date,
                userIDs: [req.body.userID]
            })
        }
        else{
            appointment.userIDs.push(req.body.userIDs)
        }
        await appointment.save();
        res.json("booked successfully !!!")
    }
    catch(err){
        res.json({
            error: err
        })
    }
    
})


module.exports = router;
