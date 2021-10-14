const router = require("express").Router();
let Client = require("../models/client.models");

router.route('/').put((req, res)=>{
    Client.findById(req.body.id).then(client=>{
        client.name = req.body.name
        client.email = req.body.email
        client.address  = req.body.address
        client.lat = req.body.lat
        client.lng = req.body.lng
        client.phone = req.body.phone
        res.json("Client updated")
    })
})

router.route('/').get((req, res)=>{
    Client.findById(req.query.id).then(client=>{
        res.json(client)
    })
})
module.exports = router;
