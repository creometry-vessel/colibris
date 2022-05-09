const router = require("express").Router();
let Location = require("../models/location.model")

router.route('/:id').delete(async (req, res)=>{
  try{
    await Location.findByIdAndDelete(req.params.id);
    res.json("location deleted")
  }
  catch(e){
    res.status(500).json({
      status: "error",
      message: e.message
    })
  }})
  
  router.route('/:id').get(async (req, res)=>{
    try{
      await Location.findById(req.params.id)
      .populate("userID", ["username", "name", "phone1", "phone2", "email"])
      .exec(function (err, location) {
        if (err) return err;
        res.json(location)
      });
    }
    catch(e){
      res.status(500).json({
        status: "error",
        message: e.message
      })
    }})
  
  router.route('/').get(async (req, res)=>{
    try{
      let search ={}
      if(req.query.userID) search.userID = req.query.userID;
      await Location.find(search)
      .populate("userID", ["username", "name", "phone1", "phone2", "email"])
      .exec(function (err, location) {
        if (err) return err;
        res.json(location)
      });
    }
    catch(e){
      res.status(500).json({
        status: "error",
        message: e.message
      })
    } })

  router.route('/all').get(async (req, res)=>{
    try{
      await Location.find()
      .populate("userID", ["username", "name", "phone1", "phone2", "email"])
      .exec(function (err, location) {
        if (err) return err;
        res.json(location)
      });
    }
    catch(e){
      res.status(500).json({
        status: "error",
        message: e.message
      })    
  }})

  router.route('/').post(async (req, res)=>{
    try{
      let location = new Location(req.body);
      await location.save();
      res.json("location created!!!")
    }
    catch(e){
      res.status(500).json({
        status: "error",
        message: e.message
      })
    }})

module.exports = router;
