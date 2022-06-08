const router = require("express").Router();
let MAX = require("../models/max_appointments.models");


router.route('/').post(async(req, res) => {
    try{
        await MAX.deleteMany();
        let max = new MAX({value: req.body.max});
        await max.save();
        res.json("max appointments updated!!!")
    }
    catch(e){
        res.status(500).json(e.message)

    }
})


router.route('/').get(async(req, res) => {
    try{
        res.json(((await MAX.find())[0])?.value)
    }
    catch(e){
        res.status(500).json(e.message)

    }
})


module.exports = router;