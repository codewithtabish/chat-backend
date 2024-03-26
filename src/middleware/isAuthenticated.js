const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        // Extract JWT token from request headers
        const authHeader = req.headers.authorization;
        
        // Check if authorization header is provided
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
        }
        
        // Split the authorization header to extract the token
        const token = authHeader.trim().split('Bearer ')[1];
        console.log("token is ", token);

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // If token is invalid or expired, return an unauthorized error
                return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
            }
            
            // If token is valid, attach the decoded user information to the request object
            req.user = decoded;
            next();
        });
        
    } catch (error) {
        next(error);
    }
};

module.exports = isAuthenticated;
