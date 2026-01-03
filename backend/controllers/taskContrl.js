const Task = require('../models/Task');

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Please add a title' });

  const task = await Task.create({
    title,
    description,
    user: req.user.id,
  });
  res.status(201).json(task);
};

// Delete a task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  // Ensure user owns the task
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await task.deleteOne();
  res.json({ id: req.params.id });
};

module.exports = { getTasks, createTask, deleteTask };