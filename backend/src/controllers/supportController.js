const supportService = require('../services/supportService');

const transportQuote = async (req, res, next) => {
    try {
        const quote = await supportService.getTransportQuote(req.body);
        res.json({ success: true, data: quote });
    } catch (error) { res.status(400); next(error); }
}

const transportBook = async (req, res, next) => {
    try {
        const booking = await supportService.bookTransport(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) { res.status(400); next(error); }
}

const insuranceQuote = async (req, res, next) => {
    try {
        const quote = await supportService.getInsuranceQuote(req.body);
        res.json({ success: true, data: quote });
    } catch (error) { res.status(400); next(error); }
}

const insuranceActivate = async (req, res, next) => {
    try {
        const policy = await supportService.activateInsurance(req.body);
        res.status(201).json({ success: true, data: policy });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    transportQuote, transportBook,
    insuranceQuote, insuranceActivate
};
