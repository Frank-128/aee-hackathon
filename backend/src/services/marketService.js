const MarketSnapshot = require('../models/MarketSnapshot');
const Crop = require('../models/Crop');
const Demand = require('../models/Demand');
const predictionService = require('./predictionService');

const getLiveDemandSupply = async () => {
    // Aggregation pipeline to sum up quantities
    const supply = await Crop.aggregate([
        { $match: { status: { $ne: 'SOLD' } } },
        { $group: { _id: null, total: { $sum: '$quantityExpected' } } }
    ]);
    const demand = await Demand.aggregate([
        { $match: { status: 'OPEN' } },
        { $group: { _id: null, total: { $sum: '$quantityRequired' } } }
    ]);

    return {
        supply: supply[0] ? supply[0].total : 0,
        demand: demand[0] ? demand[0].total : 0
    };
};

const getPriceTrends = async () => {
    // Mock trends for now, in real app query historical deals
    return [
        { crop: 'Wheat', price: 50, trend: 'UP' },
        { crop: 'Rice', price: 40, trend: 'STABLE' },
        { crop: 'Corn', price: 35, trend: 'DOWN' }
    ];
};

const getRecommendedPrices = async () => {
    // Use prediction service for multiple crops
    const crops = ['Wheat', 'Rice', 'Corn', 'Potato'];
    const prices = await Promise.all(crops.map(async (c) => {
        const price = await predictionService.getRecommendedPrice(c);
        return { crop: c, recommendedPrice: price };
    }));
    return prices;
};

const getMarketSnapshots = async () => {
    return await MarketSnapshot.find().sort({ createdAt: -1 }).limit(10);
};

module.exports = {
    getLiveDemandSupply,
    getPriceTrends,
    getRecommendedPrices,
    getMarketSnapshots
};
