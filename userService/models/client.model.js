const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    userID:{
        type: String,
        trim: true,
        required: true
    },
    Name: {
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
    MultipleLocation: {
        type: Boolean,
        required: true,
        default: false
    },
    addresses:{
        type: Array,
        required: true,
        default: []
    },
    Score: {
        type: Number,
        required: true,
        default: 2.5
    }
    });
const app = mongoose.model('client', clientSchema);

module.exports = app;