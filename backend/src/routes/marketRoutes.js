const express = require('express');
const {
    getLiveDemandSupply, getPriceTrends, getRecommendedPrices, getMarketSnapshots,
    predictCrop, predictYield, predictPrice
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

aiRouter.post('/crop', predictCrop);
aiRouter.post('/yield', predictYield);
aiRouter.post('/price', predictPrice);

module.exports = { marketRouter: router, aiRouter };
