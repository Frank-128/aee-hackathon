const mongoose = require('mongoose');

const marketSnapshotSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    totalSupply: {
        type: Number,
    },
    totalDemand: {
        type: Number,
    },
    topCropsVariable: [{
        name: String,
        avgPrice: Number,
        trend: String, // 'UP', 'DOWN', 'STABLE'
    }],
    region: {
        type: String,
        default: 'Global',
    }
}, { timestamps: true });

module.exports = mongoose.model('MarketSnapshot', marketSnapshotSchema);
