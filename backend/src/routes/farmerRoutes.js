const express = require('express');
const {
    getProfile, updateProfile,
    addLand, getLand,
    addCrop, getCrops, updateCrop, deleteCrop,
    getBuyerDemands,
    getRecommendedPrice, getYieldEstimate, getProfitEstimate
} = require('../controllers/farmerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('FARMER'));

router.route('/profile').get(getProfile).put(updateProfile);
router.route('/land').post(addLand).get(getLand);
router.route('/crop').post(addCrop);
router.route('/crops').get(getCrops);
router.route('/crop/:cropId').put(updateCrop).delete(deleteCrop);
router.get('/buyer-demands', getBuyerDemands);

// AI Insights
router.get('/recommended-price/:cropId', getRecommendedPrice);
router.get('/yield-estimate/:cropId', getYieldEstimate);
router.get('/profit-estimate/:cropId', getProfitEstimate);

module.exports = router;
