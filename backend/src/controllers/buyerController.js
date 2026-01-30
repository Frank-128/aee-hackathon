const buyerService = require('../services/buyerService');

const getProfile = async (req, res, next) => {
    try {
        const profile = await buyerService.getProfile(req.user._id);
        res.json({ success: true, data: profile });
    } catch (error) { res.status(500); next(error); }
};

const updateProfile = async (req, res, next) => {
    try {
        const profile = await buyerService.updateProfile(req.user._id, req.body);
        res.json({ success: true, data: profile });
    } catch (error) { res.status(500); next(error); }
};

const addDemand = async (req, res, next) => {
    try {
        const demand = await buyerService.addDemand(req.user._id, req.body);
        res.status(201).json({ success: true, data: demand });
    } catch (error) { res.status(400); next(error); }
};

const getDemands = async (req, res, next) => {
    try {
        const demands = await buyerService.getDemands(req.user._id);
        res.json({ success: true, data: demands });
    } catch (error) { res.status(500); next(error); }
};

const updateDemand = async (req, res, next) => {
    try {
        const demand = await buyerService.updateDemand(req.user._id, req.params.demandId, req.body);
        res.json({ success: true, data: demand });
    } catch (error) { res.status(400); next(error); }
};

const deleteDemand = async (req, res, next) => {
    try {
        await buyerService.deleteDemand(req.user._id, req.params.demandId);
        res.json({ success: true, message: 'Demand deleted' });
    } catch (error) { res.status(400); next(error); }
};

const getFarmerListings = async (req, res, next) => {
    try {
        const listings = await buyerService.getFarmerListings();
        res.json({ success: true, data: listings });
    } catch (error) { res.status(500); next(error); }
}

const getQualityGrades = async (req, res, next) => {
    try {
        const grades = await buyerService.getQualityGrades(req.params.farmerId);
        res.json({ success: true, data: grades });
    } catch (error) { res.status(400); next(error); }
}

const negotiate = async (req, res, next) => {
    try {
        const deal = await buyerService.negotiate(req.user._id, req.body);
        res.status(201).json({ success: true, data: deal });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    getProfile, updateProfile,
    addDemand, getDemands, updateDemand, deleteDemand,
    getFarmerListings, getQualityGrades,
    negotiate
};
