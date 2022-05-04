const router = require("express").Router();
let Client = require("../models/client.model");
let Location = require("../models/location.model")
const axios = require("axios")


router.route('/map').get(async (req, res)=>{
  let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`)
  res.json({
    location: response.data.results[0].geometry.location
  });
})

//get All clients
router.route('/').get(async (req, res) => {
  let filter = {}
  if(req.query.username) filter.username = req.query.username;
  if(req.query.phone) filter.$or = [{phone1: req.query.phone}, {phone2: req.query.phone}];
  if(req.query.email) filter.email = req.query.email;
  
  let result = []
    try{
      let clients = await Client.find(filter);
      for(let client of clients){
        let location = await Location.find({managers: client._id})
        result.push({...client._doc, locations: location})
      }
      res.json(result)
    }
    catch (e){
      res.json({
        status: "error",
        message: e.message
      })
    }
  })
  //get a client by id
  
router.route('/:id').get(async (req, res) => {
    try{
      let client = await Client.findById(req.params.id);
      let location = await Location.find({userID: client._id})
      res.json({...client._doc, locations: location})
    }
    catch (e){
      res.json({
        status: "error",
        message: e.message
      })
    }
  })
  
  //modify a client by id
  router.route('/:id').put(async (req, res) => {
    try{
      await Client.findByIdAndUpdate(req.params.id, req.body);
      if(req.body.locations){
        for(let location of req.body.locations){
          if(location._id){
            await Location.findByIdAndUpdate(location._id, location);
          }
          else {
            location = new Location({
              userID: req.params.id,
              address: location.address
            })
            await location.save()
          }
        }
      }
      
      res.json("client updated successfully!!")
    }
    catch (e){
      console.log(e)
      res.json({
        status: "error",
        message: e.message
      })
    }
  })
  
  //create a client if doesn't exist
  router.route('/auth/facebook').post(async (req, res) => {
    try{
      let client = await Client.findOne({providerID: req.body.userID});
      if(!client){
        client = new Client({providerID: req.body.userID, email: req.body.email, name: req.body.name, role: "customer", avatar: req.body.picture.data.url})
        await client.save();
      }
        res.json(client)
    }
    catch (e){
      console.log(e)
      res.json({
        status: "error",
        message: e.message
      })
    }
  })


module.exports = router;
