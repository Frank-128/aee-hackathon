const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String, // Can be refined to GeoJSON later
        required: true,
    },
    area: {
        type: Number, // In acres or hectares
        required: true,
    },
    soilType: {
        type: String,
        required: true,
    },
    waterSource: {
        type: String,
        enum: ['RAIN', 'IRRIGATION', 'CANAL', 'WELL'],
        default: 'RAIN',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    documents: [{
        type: String, // URL to document
    }],
}, { timestamps: true });

module.exports = mongoose.model('Land', landSchema);
