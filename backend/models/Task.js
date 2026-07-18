// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// Schema for storing task details in the database
const taskSchema = new mongoose.Schema(

    {
        // Title of the task
        title: {
            type: String,
            required: true
        },

        // Optional description for the task
        description: {
            type: String
        },

        // Current status of the task
        // Only these three values are allowed
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        // Stores the ID of the user who created this task
        // ObjectId creates a relationship between Task and User collections
        // 'ref: "User"' tells Mongoose that this ID belongs to the User model
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },

    // Automatically adds createdAt and updatedAt fields
    {
        timestamps: true
    }

);

// Create the Task model using the schema
// This model provides methods like create(), find(), update(), delete(), etc.
module.exports = mongoose.model("Task", taskSchema);