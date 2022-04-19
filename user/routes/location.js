const router = require("express").Router();
let Location = require("../models/location.model")

router.route('/:id').delete(async (req, res)=>{
    await Location.findByIdAndDelete(req.params.id);
    res.json("location deleted")
  })
  
  router.route('/:id').get(async (req, res)=>{
    await Location.findById(req.params.id)
    .populate("userID", ["username", "name", "phone1", "phone2", "email"])
    .exec(function (err, location) {
      if (err) return err;
      res.json(location)
    });
  })
  
  router.route('/').get(async (req, res)=>{
    await Location.find()
    .populate("userID", ["username", "name", "phone1", "phone2", "email"])
    .exec(function (err, location) {
      if (err) return err;
      res.json(location)
    });
  })
  router.route('/all').get(async (req, res)=>{
    await Location.find()
    .populate("userID", ["username", "name", "phone1", "phone2", "email"])
    .exec(function (err, location) {
      if (err) return err;
      res.json(location)
    });
  })

module.exports = router;
