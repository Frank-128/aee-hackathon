const authService = require('../services/authService');

const register = async (req, res, next) => {
    try {
        const userPre = req.body;
        // Default to FARMER if not provided, though validation should catch it if strict
        if (!userPre.role) userPre.role = 'BUYER';

        const user = await authService.registerUser(userPre);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        // Pass to error middleware
        res.status(400); // Bad request for register failure usually
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await authService.loginUser(email, password);
        res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(401);
        next(error);
    }
};

const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
};

const logout = async (req, res) => {
    // Client side handling mostly, but can invalidate refresh token in DB
    try {
        if (req.user) {
            const User = require('../models/User'); // Import here to avoid circular or just use service
            await User.findByIdAndUpdate(req.user._id, { refreshToken: '' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Refresh Token is required');
        }
        const data = await authService.refreshUserToken(refreshToken);
        res.json({ success: true, data });
    } catch (error) {
        res.status(401);
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        await authService.changeUserPassword(req.user._id, oldPassword, newPassword);
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    refreshToken,
    changePassword
};
