const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');

const registerUser = async (userData) => {
    const { name, email, password, role } = userData;

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            refreshToken: generateRefreshToken(user._id),
        };
    } else {
        throw new Error('Invalid user data');
    }
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            refreshToken: refreshToken,
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

const refreshUserToken = async (token) => {
    // Logic to verify refresh token and issue new access token
    // This requires decoding the token, checking db, etc.
    // For simplicity, we will assume the controller handles the verification or we implement it here
    // But since decode happens, we need jwt.
    const jwt = require('jsonwebtoken');
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== token) {
            throw new Error('Invalid refresh token');
        }

        return {
            token: generateToken(user._id),
        };
    } catch (error) {
        throw new Error('Not authorized, token failed');
    }
}

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!user) throw new Error('User not found');

    if (!(await user.matchPassword(oldPassword))) {
        throw new Error('Invalid old password');
    }

    user.password = newPassword; // Pre-save hook will hash it
    await user.save();
    return true;
}

module.exports = {
    registerUser,
    loginUser,
    refreshUserToken,
    changeUserPassword
};
