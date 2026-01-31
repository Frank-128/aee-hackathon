const Crop = require('../models/Crop');
const Demand = require('../models/Demand');

const matchSupplyToDemand = async () => {
    // Find all OPEN demands
    const demands = await Demand.find({ status: 'OPEN' });
    const matches = [];

    for (const demand of demands) {
        // Find matching crops
        const matchingCrops = await Crop.find({
            name: demand.cropName,
            status: { $in: ['PLANTED', 'GROWING', 'HARVESTED'] },
            quantityExpected: { $gte: demand.quantityRequired },
            // pricePerUnit: { $lte: demand.maxPricePerUnit } // Optional filter
        }).populate('farmer', 'name email');

        if (matchingCrops.length > 0) {
            matches.push({
                demand,
                matches: matchingCrops
            });
        }
    }
    return matches;
};

const findMatchesForFarmer = async (farmerId) => {
    // Find crops of this farmer
    const crops = await Crop.find({ farmer: farmerId });
    const cropNames = crops.map(c => c.name);

    // Find demands for these crops
    const matches = await Demand.find({
        cropName: { $in: cropNames },
        status: 'OPEN'
    }).populate('buyer', 'name email');

    return matches;
};

const findMatchesForBuyer = async (buyerId) => {
    const demands = await Demand.find({ buyer: buyerId, status: 'OPEN' });
    const demandCrops = demands.map(d => d.cropName);

    const matches = await Crop.find({
        name: { $in: demandCrops },
        status: { $in: ['PLANTED', 'GROWING', 'HARVESTED'] }
    }).populate('farmer', 'name email');

    return matches;
};

module.exports = {
    matchSupplyToDemand,
    findMatchesForFarmer,
    findMatchesForBuyer
};
