const admin = (req, res, next) => {
    // Check if user exists and has admin role
    // Note: This middleware should be used AFTER auth middleware
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
};

module.exports = admin;
