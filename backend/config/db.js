// Import Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Function to establish a connection with MongoDB
// We create a function instead of connecting immediately so that
// we can decide when the connection should be made.
const connectDB = async () => {
    try {

        // Connect to the MongoDB database using the connection string
        // stored inside the .env file
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log("Database Connection Failed");
        console.log(error.message);

        // Stop the application if the database connection fails
        // because the server cannot work without the database
        process.exit(1);
    }
};

// Export this function so it can be called from server.js
module.exports = connectDB;