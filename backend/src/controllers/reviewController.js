const reviewService = require('../services/reviewService');

const addReview = async (req, res, next) => {
    try {
        const review = await reviewService.addReview(req.user._id, req.body);
        res.status(201).json({ success: true, data: review });
    } catch (error) { res.status(400); next(error); }
}

const getReviews = async (req, res, next) => {
    try {
        // Param could be farmerId or buyerId
        const id = req.params.farmerId || req.params.buyerId;
        const reviews = await reviewService.getReviewsForUser(id);
        res.json({ success: true, data: reviews });
    } catch (error) { res.status(500); next(error); }
}

const getTrustScore = async (req, res, next) => {
    try {
        const score = await reviewService.getTrustScore(req.params.farmerId);
        res.json({ success: true, data: { trustScore: score } });
    } catch (error) { res.status(500); next(error); }
}

module.exports = {
    addReview, getReviews, getTrustScore
};
