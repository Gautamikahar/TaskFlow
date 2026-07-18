// Import Express to create routes
const express = require("express");

// Create a new router object
// It helps organize related routes separately from server.js
const router = express.Router();

// Import authentication controller functions
const {
    loginUser,
    registerUser,
} = require("../controllers/authController");

// Route for user login
// Receives email and password from the client
router.post("/login", loginUser);

// Route for new user registration
// Receives user details and creates a new account
router.post("/register", registerUser);

// Export the router so it can be used in server.js
module.exports = router;