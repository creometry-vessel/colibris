const Zone = require("../models/zoneModel")

exports.getAllZones = async (req, res, next ) => {
    try{
        const zones = await Zone.find()
        res.status(200).json({
            status: 'succes',
            results: zones.length,
            data: {
                zones
            }
        })
    }
    catch(e){
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.createZone = async (req, res, next ) => {
    try{
        const zones = await Zone.create(req.body)
        res.status(201).json({
            status: 'Created with succes',
            data: {
                zones
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.findByCity = async (req, res, next ) => {
    try{ 
     let city = req.query.city;
     const citySearch = await Zone.find({cities: city})
     if(citySearch.length==0) {
         res.status(200).send("City n'existe pas")
     }
     else{
        res.status(200).send("City existe")
     }
     res.status(200).json({
         status: 'success',
         results: city,
         data: {
             citySearch
         }
     })
 }
 catch(e){
     console.log(e);
     res.status(400).json({
         status: "fail",
     });
 }
 };
 
