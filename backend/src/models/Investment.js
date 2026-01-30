const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['FUNDRAISING', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
        default: 'FUNDRAISING'
    },
    expectedRoi: { type: Number, required: true }, // Percentage
    durationMonths: Number
}, { timestamps: true });

const investmentSchema = new mongoose.Schema({
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
        type: String, // e.g., 'ACTIVE', 'PAYOUT_PENDING', 'COMPLETED'
        default: 'ACTIVE'
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Investment = mongoose.model('Investment', investmentSchema);

module.exports = { Project, Investment };
