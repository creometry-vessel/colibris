const router = require("express").Router();
let Client = require("../models/client.model");

router.route('/').put((req, res)=>{
   
})

//get All clients
router.route('/').get(async (req, res) => {
    try{
      let clients = await Client.find();
      res.json(clients)
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
      res.json(client)
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
  
      res.json("client updated successfully!!")
    }
    catch (e){
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
