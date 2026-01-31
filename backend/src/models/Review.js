const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String,
    roleTargeted: { // Is the review for them as a Farmer or Buyer?
        type: String,
        enum: ['FARMER', 'BUYER'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
