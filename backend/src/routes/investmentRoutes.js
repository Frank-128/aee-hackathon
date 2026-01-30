const express = require('express');
const {
    createProject, getProjects, invest, getRoiPrediction
} = require('../controllers/investmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);

// Anyone can see projects, but creating is for Farmer (maybe?) and Investing for Investor
router.post('/project', authorize('FARMER', 'ADMIN'), createProject);
router.get('/projects', getProjects);
router.post('/invest/:projectId', authorize('INVESTOR'), invest);
router.get('/roi-prediction/:projectId', authorize('INVESTOR'), getRoiPrediction);

module.exports = router;
