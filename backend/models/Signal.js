const mongoose = require('mongoose');

const signalSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pair: { type: String, required: true },
    type: { type: String, enum: ['LONG', 'SHORT'], required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Signal', signalSchema);
