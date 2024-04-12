const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model here

const authenticateToken = async (req, res, next) => {
    try {
        // Get the JWT token from the request headers
        const token = req.headers.authorization;

        // If no token is provided, return an error
        if (!token) {
            return res.status(401).json({ error: 'No token provided, authorization denied' });
        }

        // Verify the token
        const verifiedAndDecoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user ID from the decoded token
        const userId = verifiedAndDecoded.userId;

        // Fetch the user from the database using the user ID
        const user = await User.findById(userId);

        // If no user is found, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Call next middleware
        next();
    } catch (error) {
        // If token verification fails, return an error
        res.status(401).json({ error: 'Invalid/Expired token' });
    }
};

module.exports = authenticateToken;
