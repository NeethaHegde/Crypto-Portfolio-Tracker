const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask } = require('../controllers/taskContrl');
const { protect } = require('../middleware/auth'); // Import the security guard

router.get('/', protect, getTasks);      // Locked
router.post('/', protect, createTask);   // Locked
router.delete('/:id', protect, deleteTask); // Locked

module.exports = router;