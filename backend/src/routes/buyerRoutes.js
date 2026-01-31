const express = require('express');
const {
    getProfile, updateProfile,
    addDemand, getDemands, updateDemand, deleteDemand,
    getFarmerListings, getQualityGrades,
    negotiate
} = require('../controllers/buyerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('BUYER'));

router.route('/profile').get(getProfile).put(updateProfile);
router.route('/demand').post(addDemand);
router.route('/demands').get(getDemands);
router.route('/demand/:demandId').put(updateDemand).delete(deleteDemand);

router.get('/farmer-listings', getFarmerListings);
router.get('/quality-grades/:farmerId', getQualityGrades);
router.post('/negotiate', negotiate);

module.exports = router;
