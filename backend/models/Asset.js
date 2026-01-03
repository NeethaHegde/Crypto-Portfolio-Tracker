const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coin: { type: String, required: true },
    amount: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Asset', assetSchema);
