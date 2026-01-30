const farmerService = require('../services/farmerService');

const getProfile = async (req, res, next) => {
    try {
        const profile = await farmerService.getProfile(req.user._id);
        res.json({ success: true, data: profile });
    } catch (error) { res.status(500); next(error); }
};

const updateProfile = async (req, res, next) => {
    try {
        const profile = await farmerService.updateProfile(req.user._id, req.body);
        res.json({ success: true, data: profile });
    } catch (error) { res.status(500); next(error); }
};

const addLand = async (req, res, next) => {
    try {
        const land = await farmerService.addLand(req.user._id, req.body);
        res.status(201).json({ success: true, data: land });
    } catch (error) { res.status(400); next(error); }
};

const getLand = async (req, res, next) => {
    try {
        const lands = await farmerService.getLand(req.user._id);
        res.json({ success: true, data: lands });
    } catch (error) { res.status(500); next(error); }
};

const addCrop = async (req, res, next) => {
    try {
        const crop = await farmerService.addCrop(req.user._id, req.body);
        res.status(201).json({ success: true, data: crop });
    } catch (error) { res.status(400); next(error); }
};

const getCrops = async (req, res, next) => {
    try {
        const crops = await farmerService.getCrops(req.user._id);
        res.json({ success: true, data: crops });
    } catch (error) { res.status(500); next(error); }
};

const updateCrop = async (req, res, next) => {
    try {
        const crop = await farmerService.updateCrop(req.user._id, req.params.cropId, req.body);
        res.json({ success: true, data: crop });
    } catch (error) { res.status(400); next(error); }
};

const deleteCrop = async (req, res, next) => {
    try {
        await farmerService.deleteCrop(req.user._id, req.params.cropId);
        res.json({ success: true, message: 'Crop deleted' });
    } catch (error) { res.status(400); next(error); }
};

const getBuyerDemands = async (req, res, next) => {
    try {
        const demands = await farmerService.getBuyerDemands();
        res.json({ success: true, data: demands });
    } catch (error) { res.status(500); next(error); }
}

const getRecommendedPrice = async (req, res, next) => {
    try {
        const price = await farmerService.getRecommendedPrice(req.user._id, req.params.cropId);
        res.json({ success: true, data: { recommendedPrice: price } });
    } catch (error) { res.status(400); next(error); }
}

const getYieldEstimate = async (req, res, next) => {
    try {
        const yieldEst = await farmerService.getYieldEstimate(req.user._id, req.params.cropId);
        res.json({ success: true, data: { yieldEstimate: yieldEst } });
    } catch (error) { res.status(400); next(error); }
}

const getProfitEstimate = async (req, res, next) => {
    try {
        const profit = await farmerService.getProfitEstimate(req.user._id, req.params.cropId);
        res.json({ success: true, data: { profitEstimate: profit } });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    getProfile, updateProfile,
    addLand, getLand,
    addCrop, getCrops, updateCrop, deleteCrop,
    getBuyerDemands,
    getRecommendedPrice, getYieldEstimate, getProfitEstimate
};
