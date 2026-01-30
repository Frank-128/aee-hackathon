const express = require('express');
const {
    matchApi, getFarmerMatches, getBuyerMatches,
    createDeal, confirmDeal, cancelDeal, getMyDeals, updateStatus, getTracking
} = require('../controllers/dealController');
const { protect } = require('../middlewares/authMiddleware');

const matchingRouter = express.Router();
matchingRouter.use(protect);

matchingRouter.post('/match', matchApi);
matchingRouter.get('/matches/farmer', getFarmerMatches);
matchingRouter.get('/matches/buyer', getBuyerMatches);

const dealsRouter = express.Router();
dealsRouter.use(protect);

dealsRouter.post('/create', createDeal);
dealsRouter.post('/confirm/:dealId', confirmDeal);
dealsRouter.post('/cancel/:dealId', cancelDeal);
dealsRouter.get('/my-deals', getMyDeals);
dealsRouter.patch('/status/:dealId', updateStatus);
dealsRouter.get('/tracking/:dealId', getTracking);

module.exports = { matchingRouter, dealsRouter };
