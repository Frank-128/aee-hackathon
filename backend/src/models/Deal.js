const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    seller: { // Farmer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['CREATED', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
        default: 'CREATED',
    },
    negotiationHistory: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        price: Number,
        message: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
