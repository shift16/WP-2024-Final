// Middleware for JWT
const jwt = require('jsonwebtoken');
require('dotenv').config()

function verifyToken(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Get the token part

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err)
                return res.status(403).json({ message: 'Forbidden: Invalid token' });

            // Attach user info to the request object
            req.user = user;
            // Proceed to the next middleware or route handler
            next();
        });
    } else
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
};

function registerTokenWithId(userId) {
    return jwt.sign(
        { data: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7h' }
    )
}

module.exports = { 
    verifyToken, 
    registerTokenWithId
}