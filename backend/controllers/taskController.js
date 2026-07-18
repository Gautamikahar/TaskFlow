// Import the Task model to perform CRUD operations on the Task collection
const Task = require("../models/Task");


// ---------------------- CREATE TASK ----------------------
const createTask = async (req, res) => {
    try {

        // Get task details from the request body
        const { title, description, status } = req.body;

        // Create a new task and associate it with the logged-in user
        const task = await Task.create({
            title,
            description,
            status,

            // User ID is taken from the verified JWT token
            // This ensures that a task always belongs to the authenticated user
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ---------------------- GET ALL TASKS ----------------------
const getTasks = async (req, res) => {
    try {

        // Fetch only the tasks created by the logged-in user
        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ---------------------- UPDATE TASK ----------------------
const updateTask = async (req, res) => {
    try {

        // Find the task using its ID and make sure it belongs
        // to the currently logged-in user before updating it
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },

            // Update the fields sent in the request body
            req.body,

            // Return the updated document instead of the old one
            {
                new: true
            }
        );

        // If no matching task is found, return an error
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ---------------------- DELETE TASK ----------------------
const deleteTask = async (req, res) => {

    try {

        // Delete the task only if it belongs to the logged-in user
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Export all controller functions
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};