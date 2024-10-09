const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    favoriteHousemakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Homemaker' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    role: {
        type: String,
        default: 'customer'
    }, 
    otp: {
        type: Number
    },
    token: {
        type: String
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
