const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks with optional filtering
router.get('/', taskController.getAllTasks);

// Get a specific task by ID
router.get('/:id', taskController.getTaskById);

// Create a new task
router.post('/', taskController.createTask);

// Update an existing task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
