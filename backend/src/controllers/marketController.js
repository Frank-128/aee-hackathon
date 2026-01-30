const marketService = require('../services/marketService');
const predictionService = require('../services/predictionService');

// Market Intelligence
const getLiveDemandSupply = async (req, res, next) => {
    try {
        const data = await marketService.getLiveDemandSupply();
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const getPriceTrends = async (req, res, next) => {
    try {
        const data = await marketService.getPriceTrends();
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const getRecommendedPrices = async (req, res, next) => {
    try {
        const data = await marketService.getRecommendedPrices();
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const getMarketSnapshots = async (req, res, next) => {
    try {
        const data = await marketService.getMarketSnapshots();
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

// AI Wrappers
const predictCrop = async (req, res, next) => {
    try {
        // Mock classification or disease detection
        res.json({ success: true, data: { suggestion: 'Healthy', confidence: 0.95 } });
    } catch (error) { res.status(500); next(error); }
}

const predictYield = async (req, res, next) => {
    try {
        const val = await predictionService.predictCropYield(req.body);
        res.json({ success: true, data: { yield: val } });
    } catch (error) { res.status(500); next(error); }
}

const predictPrice = async (req, res, next) => {
    try {
        const val = await predictionService.getRecommendedPrice(req.body.name);
        res.json({ success: true, data: { price: val } });
    } catch (error) { res.status(500); next(error); }
}


module.exports = {
    getLiveDemandSupply, getPriceTrends, getRecommendedPrices, getMarketSnapshots,
    predictCrop, predictYield, predictPrice
};
