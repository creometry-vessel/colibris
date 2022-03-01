const mongoose = require("mongoose")

const zoneSchema = new mongoose.Schema({
    weekday: {
        type: String,
        require: [true, "Zone must have a weekday"]
    },
    cities: {
        type: [String],
        default: undefined,
        required: [true, "Zone must have cities"]
    }
});

const Zone = mongoose.model("Zone", zoneSchema);
module.exports = Zone;