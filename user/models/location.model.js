const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const addressSchema = new Schema({
    lng:{
        type: Number,
    },
    lat:{
        type: Number,
    },
    addressType:{
        type: String,
        trim: true,
        enum: ["appartment", "buildling", "house"]
    },
    locationType:{
        type: String,
        trim: true,
        enum: ["professionel", "residental"]
    },
    streetNumber:{
        type: Number,
    },
    state:{
        type: String,
        trim: true
    },
    city:{
        type: String,
        trim: true
    },
    zipCode:{
        type: Number,
    }
})
const locationSchema = new Schema({
    userID:{
        type: String,
        trim: true,
        required: true
    },
    managers: {
        type: [String],
    },
    address:{
        type: addressSchema
    }
    });
const app = mongoose.model('location', locationSchema);

module.exports = app;