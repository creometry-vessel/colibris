const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    status: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    Date: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    }
    }); 
const app = mongoose.model('appointment', appointmentSchema);

module.exports = app;