const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
    cropActivity,
    averagePrice,
    bestCropToday,
    bestSellingWindow,
    highDemandForecast
} = require('../controllers/ai.controller');

const router = express.Router();

router.use(protect); // All routes protected

router.post('/crop-activity', cropActivity);
router.post('/average-price', averagePrice);
router.post('/best-crop-today', bestCropToday);
router.post('/best-selling-window', bestSellingWindow);
router.post('/high-demand-forecast', highDemandForecast);

module.exports = router;
