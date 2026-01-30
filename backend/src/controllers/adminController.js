const adminService = require('../services/adminService');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await adminService.getUsers();
        res.json({ success: true, data: users });
    } catch (error) { res.status(500); next(error); }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await adminService.getUser(req.params.userId);
        res.json({ success: true, data: user });
    } catch (error) { res.status(400); next(error); }
}

const updateUserRole = async (req, res, next) => {
    try {
        const user = await adminService.updateUserRole(req.params.userId, req.body.role);
        res.json({ success: true, data: user });
    } catch (error) { res.status(400); next(error); }
}

const getAnalytics = async (req, res, next) => {
    try {
        const stats = await adminService.getOverviewStats();
        res.json({ success: true, data: stats });
    } catch (error) { res.status(500); next(error); }
}

const deleteItem = async (req, res, next) => {
    // Generic delete or specific based on route
    try {
        if (req.params.reviewId) await adminService.deleteReview(req.params.reviewId);
        if (req.params.cropId) await adminService.deleteCrop(req.params.cropId);
        if (req.params.demandId) await adminService.deleteDemand(req.params.demandId);

        res.json({ success: true, message: 'Item deleted' });
    } catch (error) { res.status(400); next(error); }
}

module.exports = {
    getAllUsers, getUserById, updateUserRole, getAnalytics, deleteItem
};
