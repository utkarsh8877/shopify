const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
