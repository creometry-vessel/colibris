const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    userID:{
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String, 
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone1: {
        type: String,
        trim: true
    },
    phone2: {
        type: String,
        trim: true
    },
    addresses:{
        type: Array,
        required: true,
        default: []
    },
    score: {
        type: Number,
        required: true,
        default: 2.5
    }
    });
const app = mongoose.model('client', clientSchema);

module.exports = app;