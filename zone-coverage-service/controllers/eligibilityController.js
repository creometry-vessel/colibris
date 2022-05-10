const { response } = require("express");
var request = require('request');
const Zone = require("../models/zoneModel")

/*async function reverseGeoCoding(req) {
    
    if(req.query.lat && req.query.lng) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lng}&key=${process.env.GOOGLE_API_KEY}`;
        var city;
    return new Promise(function(resolve, reject) {
        request.post({
            url: url,
            json: true
          }, function(error, response, body){
              let parts = body.results[0].address_components;
      
              parts.forEach(part => {
                  if (part.types.includes("locality")){
                      city = part.long_name;
                      resolve(city);
                  } 
              }); 
          });
    })
}
    else {
        city = req.query.city;
        return Promise.resolve(city);
    }
}*/

exports.checkEligibility = async (req, res, next ) => {
    try { 
        var city = req.query.city;
        console.log("city: ", city)
        //var _cities = new Array;
        const zones = await Zone.find({cities: new RegExp(city,'i')  })
    
       if (zones.length==0) {
            res.status(200).send("Vous n'êtes pas éligible")
        }
        else{
         const results =  zones.map(zone => {
            var res = "";
            res += "le "+ zone.weekday
            return res;
                });

        res.status(200).json({
            results: "Vous êtes éligible",
            pickup: results
        })
        } 
    }
    
    catch(e){
        res.status(400).json({
        status: "fail",
        });
    }
};


