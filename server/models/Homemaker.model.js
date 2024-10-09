const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Review = require('../models/Review.model.js');

const homemakerSchema = new mongoose.Schema({
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
    cloudKitchenDetails: {
        name: {
            type: String
        },
        description: {
            type: String
        },
        rating: {
            type: Number,
            default: 0
        },
        menuItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu'
            }
        ]
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    subscription: {
        type: Boolean,
        default: false,
    },
    activeOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    role: {
        type: String,
        default: 'homemaker'
    },
    otp: {
        type: Number
    },
    token: {
        type: String
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    failedOrders: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

homemakerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

homemakerSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('Homemaker', homemakerSchema);
