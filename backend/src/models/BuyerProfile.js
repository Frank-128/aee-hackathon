const mongoose = require('mongoose');

const buyerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    companyName: {
        type: String,
    },
    buyerType: {
        type: String, // e.g., 'RETAILER', 'WHOLESALER', 'EXPORTER'
    },
    interests: [{
        type: String // Crops they are interested in
    }],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }
}, { timestamps: true });

module.exports = mongoose.model('BuyerProfile', buyerProfileSchema);
