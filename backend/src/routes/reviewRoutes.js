const express = require('express');
const {
    addReview, getReviews, getTrustScore
} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);

router.post('/', addReview);
router.get('/farmer/:farmerId', getReviews);
router.get('/buyer/:buyerId', getReviews);
router.get('/trust-score/:farmerId', getTrustScore);

module.exports = router;
