const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

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
app.post('/auth/facebook', async (req, res) => {
  try{
    let client = await Client.findOne({userID: req.body.userID});
    if(!client){
      client = new Client({userID: req.body.userID, email: req.body.email})
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

app.get("/api/hotel", (req, res)=>{
  //access base
  //a3tini hotel par region
  let hotels = [{name: "carmen"}, {name: 'movenpick'}]
  res.send(hotels)
})


app.get('/testing', async (req, res) => {
  res.json("testing...")
})