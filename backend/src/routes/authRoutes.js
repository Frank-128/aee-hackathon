const express = require('express');
const { register, login, getMe, logout, refreshToken, changePassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { z } = require('zod');

const router = express.Router();

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        role: z.enum(['FARMER', 'BUYER', 'ADMIN', 'INVESTOR']).optional(),
        location: z.object({
            state: z.string().optional(),
            district: z.string().optional(),
            city: z.string().optional(),
            address: z.string().optional(),
        }).optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.patch('/change-password', protect, changePassword);

module.exports = router;
