// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// A schema defines the structure of the documents
// that will be stored inside the MongoDB collection
const userSchema = new mongoose.Schema({

    // Stores the user's name
    name: {
        type: String,
        required: true
    },

    // Stores the user's email
    // 'unique' ensures that two users cannot register
    // using the same email address
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Stores the hashed password of the user
    // (Not the original plain text password)
    password: {
        type: String,
        required: true
    }

});

// Create a model using the schema.
// The model provides methods like:
// find(), findOne(), create(), save(), update(), delete(), etc.
const User = mongoose.model("User", userSchema);

// Export the model so it can be used inside controllers
module.exports = User;