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
     console.log(city," ",citySearch);
     if(citySearch.length==0) {
         res.status(200).json({
             results: "City n'existe pas",
         })
     }
     else {
        res.status(200).send({
            results: "City existe",
            data: city })
     }
    } 
    catch(e){
     console.log(e);
     res.status(400).json({
         status: "fail",
     });
    }
 };
 //does weekday have to be unique
 //the model we have is functional for just one week
 exports.updateZone= async (req,res, next) => {
     try { 
        const newZone = await Zone.findOneAndUpdate({weekday: req.params.weekday},req.body, {
            new: true,
            runValidators: true
        }
        );
        res.status(200).json({
            status: "successefully updated",
            data: {
                newZone,
            }
        })
        }
    catch(e){
        res.status(400).json({
            status: "Failed Update"
        })
        console.log(e);
    }
 }
 exports.deleteZone= async (req,res, next) => {
     try{
        await Zone.findOneAndDelete({weekday: req.params.weekday});
        res.status(200).json({
            status: "successefully deleted",
        })

     }
     catch(e){
         res.status(400).json({
             status: "Failed delete"
         })
     }
 }
 
