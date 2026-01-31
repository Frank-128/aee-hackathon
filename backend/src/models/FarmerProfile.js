const mongoose = require('mongoose');

const farmerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    bio: {
        type: String,
    },
    primaryCrops: [{
        type: String // e.g., 'Wheat', 'Rice'
    }],
    experienceYears: {
        type: Number,
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }
}, { timestamps: true });

module.exports = mongoose.model('FarmerProfile', farmerProfileSchema);
