const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected !!!");
});
let Client = require("./models/client.model");

app.listen(port, () => {
  console.log("server is running on port",port);
});
//get All clients
app.get('/', async (req, res) => {
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

app.get('/:id', async (req, res) => {
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
app.put('/:id', async (req, res) => {
  try{
    let client = await Client.findByIdAndUpdate(req.params.id, req.body);

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
app.post('/auth/facebook', async (req, res) => {
  try{
    let client = await Client.findOne({facebookID: req.body.facebookID});
    if(!client){
      client = new Client({facebookID: req.body.facebookID})
      await client.save();
    }
      res.json(client)
  }
  catch (e){
    res.json({
      status: "error",
      message: e.message
    })
  }
})