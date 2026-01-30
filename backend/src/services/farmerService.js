const FarmerProfile = require('../models/FarmerProfile');
const Land = require('../models/Land');
const Crop = require('../models/Crop');
const Demand = require('../models/Demand');
const predictionService = require('./predictionService');

// Profile
const getProfile = async (userId) => {
    return await FarmerProfile.findOne({ user: userId });
};

const updateProfile = async (userId, data) => {
    return await FarmerProfile.findOneAndUpdate(
        { user: userId },
        { ...data, user: userId },
        { new: true, upsert: true }
    );
};

// Land
const addLand = async (userId, landData) => {
    return await Land.create({ ...landData, farmer: userId });
};

const getLand = async (userId) => {
    return await Land.find({ farmer: userId });
};

// Crop
const addCrop = async (userId, cropData) => {
    return await Crop.create({ ...cropData, farmer: userId });
};

const getCrops = async (userId) => {
    return await Crop.find({ farmer: userId });
};

const updateCrop = async (userId, cropId, data) => {
    return await Crop.findOneAndUpdate(
        { _id: cropId, farmer: userId },
        data,
        { new: true }
    );
};

const deleteCrop = async (userId, cropId) => {
    return await Crop.findOneAndDelete({ _id: cropId, farmer: userId });
};

// Demands matching (Simple logic)
const getBuyerDemands = async () => {
    return await Demand.find({ status: 'OPEN' });
};

// Insights
const getRecommendedPrice = async (userId, cropId) => {
    // Ideally fetch crop details to know name
    const crop = await Crop.findById(cropId);
    if (!crop) throw new Error('Crop not found');
    return await predictionService.getRecommendedPrice(crop.name);
};

const getYieldEstimate = async (userId, cropId) => {
    const crop = await Crop.findById(cropId);
    if (!crop) throw new Error('Crop not found');
    return await predictionService.predictCropYield(crop);
};

const getProfitEstimate = async (userId, cropId) => {
    const crop = await Crop.findById(cropId);
    if (!crop) throw new Error('Crop not found');

    const yieldEst = await predictionService.predictCropYield(crop);
    const priceEst = await predictionService.getRecommendedPrice(crop.name);

    return await predictionService.estimateProfit(cropId, yieldEst, priceEst);
};

module.exports = {
    getProfile,
    updateProfile,
    addLand,
    getLand,
    addCrop,
    getCrops,
    updateCrop,
    deleteCrop,
    getBuyerDemands,
    getRecommendedPrice,
    getYieldEstimate,
    getProfitEstimate
};
