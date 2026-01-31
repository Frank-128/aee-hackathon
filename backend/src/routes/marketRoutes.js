const express = require('express');
const {
    getLiveDemandSupply, getPriceTrends, getRecommendedPrices, getMarketSnapshots,
    predictCrop, predictYield, predictPrice,
    getDashboardInsights, predictCropRecommendations, predictPriceForecast
} = require('../controllers/marketController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
// Market Intelligence - Public or User Protected? User protected for now
const aiRouter = express.Router();

router.use(protect);
aiRouter.use(protect);

router.get('/live-demand-supply', getLiveDemandSupply);
router.get('/price-trends', getPriceTrends);
router.get('/recommended-prices', getRecommendedPrices);
router.get('/market-snapshots', getMarketSnapshots);

aiRouter.get('/insights', getDashboardInsights); // New endpoint for dashboard
aiRouter.post('/crop', predictCrop);
aiRouter.post('/yield', predictYield);
aiRouter.post('/price', predictPrice);
aiRouter.post('/crop-recommendations', predictCropRecommendations); // New endpoint
aiRouter.post('/price-forecast', predictPriceForecast); // New endpoint

module.exports = { marketRouter: router, aiRouter };
