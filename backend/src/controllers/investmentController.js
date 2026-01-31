const investmentService = require('../services/investmentService');

const createProject = async (req, res, next) => {
    try {
        const project = await investmentService.createProject(req.user._id, req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) { res.status(400); next(error); }
}

const getProjects = async (req, res, next) => {
    try {
        const projects = await investmentService.getProjects();
        res.json({ success: true, data: projects });
    } catch (error) { res.status(500); next(error); }
}

const invest = async (req, res, next) => {
    try {
        const investment = await investmentService.investInProject(req.user._id, req.params.projectId, req.body.amount);
        res.status(201).json({ success: true, data: investment });
    } catch (error) { res.status(400); next(error); }
}

const getRoiPrediction = async (req, res, next) => {
    try {
        const prediction = await investmentService.getRoiPrediction(req.params.projectId);
        res.json({ success: true, data: prediction });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    createProject, getProjects, invest, getRoiPrediction
};
