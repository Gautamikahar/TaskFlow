require("dotenv").config();
const express = require("express")
const app = express();
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

//node js doesn't automatically read .env
//Read the .env file and put all values inside process.env

const connectDB = require("./config/db");
//const protect = require("./middleware/protect");
const protect = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");
console.log(connectDB);
console.log(typeof connectDB);
//connectDB();

console.log("Loading auth routes...");
app.use("/api/auth",authRoutes);
app.use("/api/tasks", taskRoutes);
// app.get("/profile", protect, (req, res) => {

//     res.json({
//         success: true,
//         user: req.user
//     });

// });
app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
app.get("/", (req, res) => {
    res.send("Server is running...");
});
// app.get("/about",(req,res) => {
//     res.send("about page");
// });

// app.get("/contact",(req,res) => {
//     res.send("contact page");
// });

// app.listen(5000, () => {
//     console.log("Server started on port 5000");
// });
const startServer = async () => {
    console.log("A. Starting server...");

    await connectDB();

    console.log("B. Starting Express...");

    app.listen(process.env.PORT, () => {
        console.log(`C. Server running on port ${process.env.PORT}`);
    });
};
startServer();
