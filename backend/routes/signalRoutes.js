const express = require('express');
const router = express.Router();
const { getSignals, createSignal, deleteSignal, updateSignal } = require('../controllers/signalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSignals).post(protect, createSignal);
router.route('/:id').delete(protect, deleteSignal).put(protect, updateSignal);

module.exports = router;
