const jwt = require('jsonwebtoken')

const signToken = (user) => {
    // Only include necessary user info in the token payload
    const tokenPayload = { userId: user._id };
    const tokenKey = jwt.sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '72h' }); // Set token expiration as needed
    return tokenKey
}

const verifyToken = (req, res, next) => {
    // Retrieve token from request headers (assuming it’s passed as a Bearer token)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

        // Attach user information to request for further use
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, respond with a 403 (Forbidden) status
        res.status(403).json({ message: 'Invalid token.' });
    }
};


module.exports = { verifyToken, signToken }