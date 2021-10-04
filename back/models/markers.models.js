const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markerSchema = new Schema({
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
    status: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false
    }
    });
const app = mongoose.model('marker', markerSchema);

module.exports = app;