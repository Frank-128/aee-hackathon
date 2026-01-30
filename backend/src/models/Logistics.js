const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
    deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
    provider: String,
    cost: Number,
    status: {
        type: String,
        enum: ['PENDING', 'BOOKED', 'IN_TRANSIT', 'DELIVERED'],
        default: 'PENDING'
    },
    estimatedDelivery: Date
}, { timestamps: true });

const insuranceSchema = new mongoose.Schema({
    deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
    provider: String,
    premium: Number,
    coverageAmount: Number,
    status: {
        type: String,
        enum: ['QUOTED', 'ACTIVE', 'CLAIMED', 'EXPIRED'],
        default: 'QUOTED'
    },
    policyNumber: String
}, { timestamps: true });

const Transport = mongoose.model('Transport', transportSchema);
const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = { Transport, Insurance };
