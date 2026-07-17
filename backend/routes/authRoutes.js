const express = require("express");

const router = express.Router();

const {
    loginUser,
    registerUser,
} = require("../controllers/authController");

router.get("/hello", (req, res) => {
    res.send("Hello from auth routes");
});

console.log(loginUser);
console.log(registerUser);
console.log("Loading auth routes file...");

router.post("/login", loginUser);

console.log("Register route created");

router.post("/register", registerUser);

module.exports = router;

module.exports = router;