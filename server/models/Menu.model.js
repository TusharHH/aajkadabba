const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    homemaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homemaker',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
