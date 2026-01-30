const aiService = require('../services/ai.service');

const cropActivity = async (req, res, next) => {
    try {
        const location = req.body.location || req.user.location;
        if (!location) throw new Error('Location is required locally or in profile');
        const data = await aiService.getCropActivity(location);
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const averagePrice = async (req, res, next) => {
    try {
        const location = req.body.location || req.user.location;
        if (!location) throw new Error('Location is required locally or in profile');
        const data = await aiService.getAverageMarketPrice(location);
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const bestCropToday = async (req, res, next) => {
    try {
        const location = req.body.location || req.user.location;
        if (!location) throw new Error('Location is required locally or in profile');
        const data = await aiService.getBestCropToday(location);
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const bestSellingWindow = async (req, res, next) => {
    try {
        const location = req.body.location || req.user.location;
        if (!location) throw new Error('Location is required locally or in profile');
        const data = await aiService.getBestSellingWindow(location);
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

const highDemandForecast = async (req, res, next) => {
    try {
        const location = req.body.location || req.user.location;
        if (!location) throw new Error('Location is required locally or in profile');
        const data = await aiService.getHighDemandForecast(location);
        res.json({ success: true, data });
    } catch (error) { res.status(500); next(error); }
};

module.exports = {
    cropActivity,
    averagePrice,
    bestCropToday,
    bestSellingWindow,
    highDemandForecast
};
