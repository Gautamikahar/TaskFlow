

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
console.log("findOne:", User.findOne);
console.log("Imported User:", User);
console.log("Type:", typeof User);
console.log("authController loaded");
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
    {
        id: user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d",
    }
);

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

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

    const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
    name,
    email,
    password: hashedPassword
});

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

module.exports = {
    loginUser,
    registerUser,
};
