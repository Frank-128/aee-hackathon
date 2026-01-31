const AuditLog = require('../models/AuditLog');

const auditLogger = async (req, res, next) => {
    res.on('finish', async () => {
        if (req.user) {
            try {
                await AuditLog.create({
                    user: req.user._id,
                    action: `${req.method} ${req.originalUrl}`,
                    ip: req.ip,
                    details: `Status: ${res.statusCode}`
                });
            } catch (error) {
                console.error('Audit logging failed:', error);
            }
        }
    });
    next();
};

module.exports = auditLogger;
