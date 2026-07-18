// Import the User model to perform database operations
const User = require("../models/User");

// Library used to hash and compare passwords securely
const bcrypt = require("bcrypt");

// Library used to generate JWT tokens after successful login
const jwt = require("jsonwebtoken");


// ---------------------- LOGIN USER ----------------------
const loginUser = async (req, res) => {
    try {

        // Get email and password sent by the client
        const { email, password } = req.body;

        // Check whether a user with this email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Compare the entered password with the hashed password
        // stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Generate a JWT token containing the user's id
        // This token will be used to access protected routes
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Send the token back to the client
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ---------------------- REGISTER USER ----------------------
const registerUser = async (req, res) => {
    try {

        // Get user details from the request body
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Convert the plain password into a secure hashed password
        // before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user into MongoDB
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Export the controller functions so they can be used inside routes
module.exports = {
    loginUser,
    registerUser,
};