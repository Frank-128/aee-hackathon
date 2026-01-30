const matchingService = require('../services/matchingService');
const dealService = require('../services/dealService');

// Matching
const matchApi = async (req, res, next) => {
    try {
        const matches = await matchingService.matchSupplyToDemand();
        res.json({ success: true, count: matches.length, data: matches });
    } catch (error) { res.status(500); next(error); }
}

const getFarmerMatches = async (req, res, next) => {
    try {
        const matches = await matchingService.findMatchesForFarmer(req.user._id);
        res.json({ success: true, data: matches });
    } catch (error) { res.status(500); next(error); }
}

const getBuyerMatches = async (req, res, next) => {
    try {
        const matches = await matchingService.findMatchesForBuyer(req.user._id);
        res.json({ success: true, data: matches });
    } catch (error) { res.status(500); next(error); }
}

// Deals
const createDeal = async (req, res, next) => {
    try {
        const deal = await dealService.createDeal(req.body);
        res.status(201).json({ success: true, data: deal });
    } catch (error) { res.status(400); next(error); }
}

const confirmDeal = async (req, res, next) => {
    try {
        const deal = await dealService.confirmDeal(req.params.dealId, req.user._id);
        res.json({ success: true, data: deal });
    } catch (error) { res.status(400); next(error); }
}

const cancelDeal = async (req, res, next) => {
    try {
        const deal = await dealService.cancelDeal(req.params.dealId, req.user._id);
        res.json({ success: true, data: deal });
    } catch (error) { res.status(400); next(error); }
}

const getMyDeals = async (req, res, next) => {
    try {
        const deals = await dealService.getMyDeals(req.user._id);
        res.json({ success: true, data: deals });
    } catch (error) { res.status(500); next(error); }
}

const updateStatus = async (req, res, next) => {
    try {
        const deal = await dealService.updateStatus(req.params.dealId, req.body.status, req.user._id);
        res.json({ success: true, data: deal });
    } catch (error) { res.status(400); next(error); }
}

const getTracking = async (req, res, next) => {
    try {
        const tracking = await dealService.getTracking(req.params.dealId);
        res.json({ success: true, data: tracking });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    matchApi, getFarmerMatches, getBuyerMatches,
    createDeal, confirmDeal, cancelDeal, getMyDeals, updateStatus, getTracking
};
