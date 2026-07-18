// Import Express to create routes
const express = require("express");
const router = express.Router();

// Import all task-related controller functions
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// Import authentication middleware to protect task routes
const protect = require("../middleware/authMiddleware");

// ---------------------- TASK ROUTES ----------------------

// Create a new task
// Only authenticated users can create tasks
router.post("/", protect, createTask);

// Get all tasks of the logged-in user
router.get("/", protect, getTasks);

// Update a task using its ID
// ':id' is a route parameter that represents the task's unique ID
router.put("/:id", protect, updateTask);

// Delete a task using its ID
router.delete("/:id", protect, deleteTask);

// Export the router so it can be used in server.js
module.exports = router;