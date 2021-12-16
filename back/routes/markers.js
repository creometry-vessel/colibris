const router = require("express").Router();
let marker = require("../models/markers.models");

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
module.exports = router;
