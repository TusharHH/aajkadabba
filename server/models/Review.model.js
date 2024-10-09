const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    homemaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homemaker',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    media: [
        {
            url: {
                type: String
            },
            fileType: {
                type: String,
                enum: ['image', 'video'],
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
