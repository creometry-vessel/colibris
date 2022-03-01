const Zone = require("../models/zoneModel")

exports.checkEligibility = async (req, res, next ) => {
   try{ 
    let city = req.query.city;
    const eligible = await Zone.find({cities: city})
    if (eligible.length==0) {
        res.status(200).send("Vous n'êtes pas eligible")
    }
    else{
        res.status(200).send("Vous êtes eligible")
    }
   
}
catch(e){
    console.log(e);
    res.status(400).json({
        status: "fail",
    });
}
};

