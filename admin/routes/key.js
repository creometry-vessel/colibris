const router = require("express").Router();
let KEY = require("../models/api_key.models");


router.route('/').post(async(req, res) => {
    try{
        await KEY.deleteMany();
        let key = new KEY({value: req.body.key});
        await key.save();
        res.json("key updated!!!")
    }
    catch(e){
        res.status(500).json(e.message)

    }
})


router.route('/').get(async(req, res) => {
    try{
        res.json(((await KEY.find())[0])?.value)
    }
    catch(e){
        res.status(500).json(e.message)

    }
})


module.exports = router;