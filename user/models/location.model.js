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
    },
    locationType:{
        type: String,
        trim: true,
    },
    streetNumber:{
        type: Number,
    },
    streetName:{
        type: String,
        trim: true,
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "client"
    },
    
    address:{
        type: addressSchema
    }
    });
const app = mongoose.model('location', locationSchema);

module.exports = app;