const Deal = require('../models/Deal');

const createDeal = async (dealData) => {
    return await Deal.create(dealData);
};

const confirmDeal = async (dealId, userId) => {
    // Only seller or buyer can confirm? Usually seller triggers 'CONFIRMED' after negotiation
    const deal = await Deal.findById(dealId);
    if (!deal) throw new Error('Deal not found');

    // Check auth
    if (deal.seller.toString() !== userId.toString() && deal.buyer.toString() !== userId.toString()) {
        throw new Error('Not authorized');
    }

    deal.status = 'CONFIRMED';
    return await deal.save();
};

const cancelDeal = async (dealId, userId) => {
    const deal = await Deal.findById(dealId);
    if (!deal) throw new Error('Deal not found');

    // Check auth
    if (deal.seller.toString() !== userId.toString() && deal.buyer.toString() !== userId.toString()) {
        throw new Error('Not authorized');
    }

    deal.status = 'CANCELLED';
    return await deal.save();
};

const getMyDeals = async (userId) => {
    return await Deal.find({
        $or: [{ seller: userId }, { buyer: userId }]
    })
        .populate('crop')
        .populate('buyer', 'name')
        .populate('seller', 'name')
        .sort({ createdAt: -1 });
};

const updateStatus = async (dealId, status, userId) => {
    // Basic status update
    const deal = await Deal.findById(dealId);
    if (!deal) throw new Error('Deal not found');

    deal.status = status;
    return await deal.save();
};

const getTracking = async (dealId) => {
    const deal = await Deal.findById(dealId);
    if (!deal) throw new Error('Deal not found');
    // Mock tracking info
    return {
        dealId,
        status: deal.status,
        checkpoints: [
            { location: 'Farm Gate', status: 'Picked Up', time: new Date() }
        ],
        estimatedArrival: new Date(Date.now() + 86400000)
    };
};

module.exports = {
    createDeal,
    confirmDeal,
    cancelDeal,
    getMyDeals,
    updateStatus,
    getTracking
};
