const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markerSchema = new Schema({
    clientID: {
        type: ObjectId,
        required: true
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