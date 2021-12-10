const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    userIDs: {
        type: Array, 
        required: true, 
    }, 
    Date: {
        type: String,
        required: true,
        unique: true
    }
    });
const app = mongoose.model('appointment', appointmentSchema);

module.exports = app;