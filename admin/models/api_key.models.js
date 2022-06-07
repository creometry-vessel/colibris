const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keySchema = new Schema({
    value: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});
const app = mongoose.model('API_KEY', keySchema);

module.exports = app;