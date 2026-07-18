// Load environment variables from the .env file into process.env
require("dotenv").config();

const express = require("express");
const app = express();

// Middleware to convert incoming JSON data into JavaScript objects
app.use(express.json());

// Import application routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Import database connection function
const connectDB = require("./config/db");

// Import middleware to protect private routes
const protect = require("./middleware/authMiddleware");

// Register all authentication related routes
// Example: /api/auth/register , /api/auth/login
app.use("/api/auth", authRoutes);

// Register all task related routes
// Example: /api/tasks
app.use("/api/tasks", taskRoutes);

// Example of a protected route.
// The protect middleware verifies the JWT token before allowing access.
app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// Simple route to check whether the server is running
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Connect to MongoDB first and then start the Express server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("Failed to start server");
    }
};

// Start the application
startServer();