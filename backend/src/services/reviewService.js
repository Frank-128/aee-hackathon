const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');
// const BuyerProfile = require('../models/BuyerProfile');

const addReview = async (authorId, reviewData) => {
    const review = await Review.create({
        ...reviewData,
        author: authorId
    });

    // Recalculate average rating for the target
    // Simplified logic: just update if Farmer
    if (reviewData.roleTargeted === 'FARMER') {
        const stats = await Review.aggregate([
            { $match: { targetUser: new mongoose.Types.ObjectId(reviewData.targetUser), roleTargeted: 'FARMER' } },
            { $group: { _id: '$targetUser', avgRating: { $avg: '$rating' } } }
        ]);

        if (stats.length > 0) {
            await FarmerProfile.findOneAndUpdate({ user: reviewData.targetUser }, { averageRating: stats[0].avgRating });
        }
    }

    return review;
};

const getReviewsForUser = async (userId) => {
    return await Review.find({ targetUser: userId }).populate('author', 'name');
};

const getTrustScore = async (userId) => {
    // Mock trust score based on reviews and transaction history
    // 0 to 100
    const reviews = await Review.find({ targetUser: userId });
    if (reviews.length === 0) return 50; // Neutral start

    const avg = reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length;
    return Math.min(100, Math.floor(avg * 20)); // 5 * 20 = 100
}

module.exports = {
    addReview,
    getReviewsForUser,
    getTrustScore
};
