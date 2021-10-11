const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    },
    phone: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    });
const app = mongoose.model('client', clientSchema);

module.exports = app;