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
        // Mock yield prediction if service fails or for demo
        const val = req.body.area ? req.body.area * 2.5 : 50;
        res.json({ success: true, data: { expectedYield: val, unit: 'Quintals', params: req.body } });
    } catch (error) { res.status(500); next(error); }
}

const predictPrice = async (req, res, next) => {
    try {
        const val = await predictionService.getRecommendedPrice(req.body.name);
        res.json({ success: true, data: { price: val } });
    } catch (error) { res.status(500); next(error); }
}

const getDashboardInsights = async (req, res, next) => {
    try {
        // Mock insights for dashboard
        const insights = [
            {
                type: 'weather',
                title: 'Weather Today',
                value: '28°C',
                description: 'Perfect conditions for harvesting today',
                confidence: 0.95,
                trend: 'neutral'
            },
            {
                type: 'crop',
                title: 'Best Crop',
                value: 'Wheat',
                description: 'High demand expected next month',
                confidence: 0.88,
                trend: 'up'
            },
            {
                type: 'market',
                title: 'Market Trend',
                value: 'Bullish',
                description: 'Overall prices are rising',
                confidence: 0.75,
                trend: 'up'
            }
        ];
        res.json({ success: true, data: insights });
    } catch (error) { res.status(500); next(error); }
};

const predictCropRecommendations = async (req, res, next) => {
    try {
        const recommendations = [
            { cropName: 'Wheat', confidence: 0.95, suitable: true, reason: 'Soil moisture is optimal' },
            { cropName: 'Mustard', confidence: 0.85, suitable: true, reason: 'Good season match' },
            { cropName: 'Rice', confidence: 0.40, suitable: false, reason: 'Water level too low' }
        ];
        res.json({ success: true, data: recommendations });
    } catch (error) { res.status(500); next(error); }
};

const predictPriceForecast = async (req, res, next) => {
    try {
        // Mock forecast
        const forecast = [
            { date: '2026-02-01', price: 2100 },
            { date: '2026-02-02', price: 2150 },
            { date: '2026-02-03', price: 2120 },
            { date: '2026-02-04', price: 2200 },
            { date: '2026-02-05', price: 2250 }
        ];
        res.json({ success: true, data: { forecast, trend: 'up' } });
    } catch (error) { res.status(500); next(error); }
};

module.exports = {
    getLiveDemandSupply, getPriceTrends, getRecommendedPrices, getMarketSnapshots,
    predictCrop, predictYield, predictPrice,
    getDashboardInsights, predictCropRecommendations, predictPriceForecast
};
