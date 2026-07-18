// Import JWT library to verify authentication tokens
const jwt = require("jsonwebtoken");

// Middleware to protect private routes
// It checks whether the user has sent a valid JWT token
const protect = (req, res, next) => {
    try {

        // Read the Authorization header from the incoming request
        const authHeader = req.headers.authorization;

        // Check if the token exists and follows the format:
        // Authorization: Bearer <token>
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Extract only the token by removing the "Bearer" prefix
        const token = authHeader.split(" ")[1];

        // Verify the token using the secret key
        // If the token is invalid or expired, an error will be thrown
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store the decoded user information in the request object
        // so that the next middleware or controller can access it
        req.user = decoded;

        // Pass control to the next middleware/controller
        next();

    } catch (error) {

        // This block executes if the token is invalid or expired
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};

// Export the middleware so it can be used to protect routes
module.exports = protect;