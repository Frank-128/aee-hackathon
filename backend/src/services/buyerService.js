const BuyerProfile = require('../models/BuyerProfile');
const Demand = require('../models/Demand');
const Crop = require('../models/Crop');
const FarmerProfile = require('../models/FarmerProfile');
const Deal = require('../models/Deal');

// Profile
const getProfile = async (userId) => {
    return await BuyerProfile.findOne({ user: userId });
};

const updateProfile = async (userId, data) => {
    return await BuyerProfile.findOneAndUpdate(
        { user: userId },
        { ...data, user: userId },
        { new: true, upsert: true }
    );
};

// Demands
const addDemand = async (userId, demandData) => {
    return await Demand.create({ ...demandData, buyer: userId });
};

const getDemands = async (userId) => {
    return await Demand.find({ buyer: userId });
};

const updateDemand = async (userId, demandId, data) => {
    return await Demand.findOneAndUpdate(
        { _id: demandId, buyer: userId },
        data,
        { new: true }
    );
};

const deleteDemand = async (userId, demandId) => {
    return await Demand.findOneAndDelete({ _id: demandId, buyer: userId });
};

// Discovery
const getFarmerListings = async () => {
    return await Crop.find({ status: { $in: ['PLANTED', 'GROWING', 'HARVESTED'] } })
        .populate('farmer', 'name email')
        .populate('land', 'location');
};

const getQualityGrades = async (farmerId) => {
    // Mock logic based on farmer's past crops or reviews
    // In real app, aggregate review scores
    const profile = await FarmerProfile.findOne({ user: farmerId });
    return {
        farmerId,
        averageRating: profile ? profile.averageRating : 0,
        gradeHistory: ['A', 'A', 'B'] // Mock
    };
};

const negotiate = async (userId, dealData) => {
    // Initiate a deal or negotiation
    // Verify crop exists
    const crop = await Crop.findById(dealData.cropId);
    if (!crop) throw new Error('Crop not found');

    // Create a new Deal entry with status CREATED
    const deal = await Deal.create({
        crop: crop._id,
        buyer: userId,
        seller: crop.farmer,
        pricePerUnit: dealData.price,
        quantity: dealData.quantity,
        totalAmount: dealData.price * dealData.quantity,
        status: 'CREATED',
        negotiationHistory: [{
            sender: userId,
            price: dealData.price,
            message: dealData.message
        }]
    });

    return deal;
};

module.exports = {
    getProfile,
    updateProfile,
    addDemand,
    getDemands,
    updateDemand,
    deleteDemand,
    getFarmerListings,
    getQualityGrades,
    negotiate
};
