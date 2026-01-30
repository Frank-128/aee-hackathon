const { Project, Investment } = require('../models/Investment');

const createProject = async (userId, projectData) => {
    return await Project.create({
        ...projectData,
        farmer: userId
    });
};

const getProjects = async () => {
    return await Project.find({ status: 'FUNDRAISING' }).populate('farmer', 'name');
};

const investInProject = async (userId, projectId, amount) => {
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    if (project.currentAmount + amount > project.goalAmount) {
        throw new Error('Investment exceeds goal amount');
    }

    const investment = await Investment.create({
        investor: userId,
        project: projectId,
        amount
    });

    project.currentAmount += amount;
    if (project.currentAmount >= project.goalAmount) {
        project.status = 'ACTIVE';
    }
    await project.save();

    return investment;
};

const getRoiPrediction = async (projectId) => {
    // Mock ROI prediction logic based on project risk, duration etc.
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    const baseRoi = project.expectedRoi;
    // Add some variability
    const bestCase = baseRoi + 2;
    const worstCase = Math.max(0, baseRoi - 2);

    return {
        projectId,
        expected: baseRoi,
        bestCase,
        worstCase
    };
};

module.exports = {
    createProject,
    getProjects,
    investInProject,
    getRoiPrediction
};
