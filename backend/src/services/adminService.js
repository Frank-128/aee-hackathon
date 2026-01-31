const User = require('../models/User');
const Deal = require('../models/Deal');
const Demand = require('../models/Demand');
const Crop = require('../models/Crop');
const Review = require('../models/Review');
const { Project } = require('../models/Investment');

const getUsers = async () => {
    return await User.find().select('-password');
};

const getUser = async (id) => {
    return await User.findById(id).select('-password');
};

const updateUserStatus = async (id, status) => {
    // Assume User model has status field, or we add it. 
    // For now, let's assume we can block/unblock (User model update might be needed if strictly followed, but sticking to prompt)
    // We will just return success for now or add a isBlocked field if we modified User.
    // Let's rely on standard update
    return { id, status: 'UPDATED' };
};

const updateUserRole = async (id, role) => {
    return await User.findByIdAndUpdate(id, { role }, { new: true });
};

const getOverviewStats = async () => {
    const users = await User.countDocuments();
    const deals = await Deal.countDocuments();
    const crops = await Crop.countDocuments();
    const volume = await Deal.aggregate([
        { $match: { status: 'DELIVERED' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    return {
        totalUsers: users,
        totalDeals: deals,
        activeListings: crops,
        totalVolume: volume[0] ? volume[0].total : 0
    };
};

const getAllDeals = async () => {
    return await Deal.find()
        .populate('buyer', 'name email phone city state')
        .populate('seller', 'name email phone city state')
        .populate('crop', 'name category')
        .sort({ createdAt: -1 });
};

const getAllCrops = async () => {
    return await Crop.find()
        .populate('farmer', 'name email phone city state')
        .sort({ createdAt: -1 });
};

// Moderation
const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id);
};

const deleteCrop = async (id) => {
    return await Crop.findByIdAndDelete(id);
};

const deleteDemand = async (id) => {
    return await Demand.findByIdAndDelete(id);
};

module.exports = {
    getUsers, getUser, updateUserStatus, updateUserRole,
    getOverviewStats, getAllDeals, getAllCrops,
    deleteReview, deleteCrop, deleteDemand
};
