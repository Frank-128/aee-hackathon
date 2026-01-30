const mongoose = require('mongoose');

const demandSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cropName: {
        type: String,
        required: true,
    },
    quantityRequired: {
        type: Number,
        required: true,
    },
    minQualityGrade: {
        type: String,
        enum: ['A', 'B', 'C'],
        default: 'B',
    },
    maxPricePerUnit: {
        type: Number,
        required: true,
    },
    neededByDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['OPEN', 'FULFILLED', 'CANCELLED'],
        default: 'OPEN',
    },
}, { timestamps: true });

module.exports = mongoose.model('Demand', demandSchema);
