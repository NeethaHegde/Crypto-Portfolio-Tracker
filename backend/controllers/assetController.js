const Asset = require('../models/Asset');

// @desc    Get assets
// @route   GET /api/assets
// @access  Private
const getAssets = async (req, res) => {
    const assets = await Asset.find({ user: req.user.id });
    res.status(200).json(assets);
};

// @desc    Add asset
// @route   POST /api/assets
// @access  Private
const addAsset = async (req, res) => {
    const { coin, amount, buyPrice } = req.body;

    if (!coin || !amount || !buyPrice) {
        return res.status(400).json({ message: 'Please add coin name, amount, and buy price' });
    }

    const asset = await Asset.create({
        coin,
        amount,
        buyPrice,
        user: req.user.id,
    });

    res.status(200).json(asset);
};

// @desc    Update asset
// @route   PUT /api/assets/:id
// @access  Private
const updateAsset = async (req, res) => {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
        return res.status(400).json({ message: 'Asset not found' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (asset.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedAsset);
};

// @desc    Delete asset
// @route   DELETE /api/assets/:id
// @access  Private
const deleteAsset = async (req, res) => {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
        return res.status(400).json({ message: 'Asset not found' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (asset.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await asset.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset,
};
