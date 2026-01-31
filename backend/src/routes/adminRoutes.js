const express = require('express');
const {
    getAllUsers, getUserById, updateUserRole, getAnalytics, deleteItem,
    getAllDeals, getAllCrops
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);
router.use(authorize('ADMIN'));

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/:userId/role', updateUserRole);

router.get('/analytics/overview', getAnalytics);

router.get('/deals', getAllDeals);
router.get('/crops', getAllCrops);

// Moderation
router.delete('/review/:reviewId', deleteItem);
router.delete('/crop/:cropId', deleteItem);
router.delete('/demand/:demandId', deleteItem);

module.exports = router;
