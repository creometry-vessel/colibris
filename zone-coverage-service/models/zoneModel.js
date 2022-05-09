const mongoose = require("mongoose")

const zoneSchema = new mongoose.Schema({
    weekday: {
        type: String,
        enum: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
        unique: true,
        require: [true, "Zone must have a weekday"]
        
    },
    cities: {
        type: [String],
        required: [true, "Zone must have cities"]
    }
});

const Zone = mongoose.model("Zone", zoneSchema);
module.exports = Zone;