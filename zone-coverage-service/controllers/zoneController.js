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
exports.getZone = async (req, res, next ) => {
    try{
        const zones = await Zone.findOne({weekday: req.params.weekday})
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
/*exports.createZone = async (req, res, next ) => {
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
        res.status(400).json({
            status: "fail",
        });
    }
};*/
exports.findByCity = async (req, res, next ) => {
    try{ 
     let city = req.query.city;
     const citySearch = await Zone.find({cities: new RegExp(city,'i')})
     if(citySearch.length==0) {
         res.status(200).json({
             results: "City n'existe pas",
         })
     }
     else {
         let result = [];
         for(let zone of citySearch){
             result.push(zone.weekday);
         }
        res.status(200).send({
            results: "City existe",
            data: result })
     }
    } 
    catch(e){
     res.status(400).json({
         status: "fail",
     });
    }
 };
 
 exports.updateZone= async (req,res, next) => {
     try { 
        const newZone = await Zone.findOneAndUpdate({weekday: req.params.weekday},req.body, {
            new: true,
            runValidators: true
        }
        );
        res.status(200).json({
            status: "Successefully updated",
            data: {
                newZone,
            }
        })
        }
    catch(e){
        res.status(400).json({
            status: "Failed Update"
        })
    }
 }
 exports.deleteZone= async (req,res, next) => {
    
        await Zone.findOneAndDelete({weekday: req.params.weekday})
                  .then(doc => {
                    if(doc) { 
                        res.status(200).json({
                        status: "Successefully Deleted",
                    })} 
                    else   
                        res.status(400).json({
                            status: "Delete Failed",
                        })
                    })
                 .catch(err => res.status(400).json({
                    status: "An Error Occured",
                }) )
     
 }  
 
