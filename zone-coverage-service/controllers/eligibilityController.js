const { response } = require("express");
var request = require('request');
const Zone = require("../models/zoneModel")

exports.checkEligibility = async (req, res, next ) => {
   try{ 
    /*if(req.query.lat && req.query.lng)
    {   lat = req.query.lat;
        lng = req.query.lng;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;
        request.post({
          url:     url,
          json: true
        }, function(error, response, body){
            var city = body.results[0].formatted_address;
            console.log("google maps api response ", city);
        });
    }*/
   
    var city = req.query.city
    
    const zones = await Zone.find({cities: city})
    if (zones.length==0) {
        res.status(200).send("Vous n'êtes pas éligible")
        console.log(zones)
    }
    else{
        console.log(zones)
        const results =  zones.map(zone => {
            var res = "";
            res += "le "+zone.weekday
            return res;
        }         
     );
        console.log(results);

        res.status(200).json({
            results: "Vous êtes eligible",
            pickup: "Le pickup est programmé pour " + results
        
        })
    }
   
}
catch(e){
    console.log(e);
    res.status(400).json({
        status: "fail",
    });
}
};

