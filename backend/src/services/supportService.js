const { Transport, Insurance } = require('../models/Logistics');

// Mock external calculations
const getTransportQuote = async (data) => {
    // data: { origin, destination, weight }
    return {
        provider: 'QuickHaul Logistics',
        cost: Math.floor(Math.random() * 500) + 100, // Mock cost
        estimatedDays: 3
    };
};

const bookTransport = async (data) => {
    return await Transport.create({
        ...data,
        status: 'BOOKED'
    });
};

const getInsuranceQuote = async (data) => {
    // data: { value, cropType }
    return {
        provider: 'AgriSecure',
        premium: Math.floor(data.value * 0.05), // 5% premium
        coverage: data.value
    };
};

const activateInsurance = async (data) => {
    return await Insurance.create({
        ...data,
        status: 'ACTIVE',
        policyNumber: 'AG-' + Math.floor(Math.random() * 100000)
    });
};

module.exports = {
    getTransportQuote,
    bookTransport,
    getInsuranceQuote,
    activateInsurance
};
