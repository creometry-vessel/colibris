const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    createdBy: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true,
        enum: ["morning", "afternoon"]
    },
    dueDate: {
        type: Date,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    waypointRank: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "attempted", "completed", "canceled"]
    },
    attempts: {
        type: Number
    },
    reason: {
        type: String,
    }
}, {
    timestamps: true
});
const app = mongoose.model('appointment', appointmentSchema);

module.exports = app;