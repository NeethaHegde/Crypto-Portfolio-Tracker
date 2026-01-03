const Signal = require('../models/Signal');

// @desc    Get signals
// @route   GET /api/signals
// @access  Private
const getSignals = async (req, res) => {
    const signals = await Signal.find({ user: req.user.id });
    res.status(200).json(signals);
};

// @desc    Set signal
// @route   POST /api/signals
// @access  Private
const createSignal = async (req, res) => {
    if (!req.body.pair || !req.body.type || !req.body.price) {
        return res.status(400).json({ message: 'Please add a pair, type and price' });
    }

    const signal = await Signal.create({
        pair: req.body.pair,
        type: req.body.type,
        price: req.body.price,
        description: req.body.description,
        user: req.user.id,
    });

    res.status(200).json(signal);
};

// @desc    Delete signal
// @route   DELETE /api/signals/:id
// @access  Private
const deleteSignal = async (req, res) => {
    const signal = await Signal.findById(req.params.id);

    if (!signal) {
        return res.status(400).json({ message: 'Signal not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the signal user
    if (signal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await signal.deleteOne();

    res.status(200).json({ id: req.params.id });
};

// @desc    Update signal
// @route   PUT /api/signals/:id
// @access  Private
const updateSignal = async (req, res) => {
    const signal = await Signal.findById(req.params.id);

    if (!signal) {
        return res.status(400).json({ message: 'Signal not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the signal user
    if (signal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedSignal = await Signal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedSignal);
};

module.exports = {
    getSignals,
    createSignal,
    deleteSignal,
    updateSignal,
};
