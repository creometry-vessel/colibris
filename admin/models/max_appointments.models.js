const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const maxSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    
}, {
    timestamps: true
});
const app = mongoose.model('MAX_APPOINTMENTS', maxSchema);

module.exports = app;