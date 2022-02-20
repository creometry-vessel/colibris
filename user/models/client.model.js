const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    providerID:{
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
    username: {
        type: String,
        trim: true,
        unique: true
    },
    phone1: {
        type: String,
        trim: true
    },
    phone2: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        enum: ["customer", "collector", "admin"]
    },
    avatar: {
        type: String,
        trim: true,
    }
    });
const app = mongoose.model('customer',  customerSchema);

module.exports = app;