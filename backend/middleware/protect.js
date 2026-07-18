// Import JWT library to verify authentication tokens
const jwt = require("jsonwebtoken");

// Middleware to protect private routes
// It checks whether the user has a valid JWT token before
// allowing access to the requested resource.
const protect = (req, res, next) => {

    try {

        // Read the Authorization header from the incoming request
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists and follows
        // the format: Bearer <token>
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        // Extract only the token by removing the "Bearer" prefix
        const token = authHeader.split(" ")[1];

        // Verify the token using the secret key
        // If the token is valid, jwt.verify() returns the decoded payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store the decoded user information in the request object
        // so that it can be accessed inside the controller
        req.user = decoded;

        // Pass control to the next middleware or controller
        next();

    } catch (error) {

        // This block executes if the token is invalid or expired
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

// Export the middleware so it can be used in protected routes
module.exports = protect;