const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    land: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Land',
    },
    name: {
        type: String,
        required: true,
    },
    variety: {
        type: String,
    },
    sowingDate: {
        type: Date,
        required: true,
    },
    harvestDateExpeted: {
        type: Date,
        required: true,
    },
    quantityExpected: {
        type: Number,
        required: true,
    },
    area: { // Added to support frontend
        type: Number,
    },
    category: { // Added to support frontend
        type: String,
    },
    quantityUnit: {
        type: String,
        default: 'kg',
    },
    pricePerUnit: { // Asking price
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['PLANTED', 'GROWING', 'HARVESTED', 'SOLD'],
        default: 'PLANTED',
    },
    image: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
