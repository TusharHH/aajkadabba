const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const deliveryPersonSchema = new mongoose.Schema({
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
    profileImage: {
        type: String
    },
    assignedOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    vehicleDetails: {
        vehicleType: {
            type: String,
            required: true
        },
        vehicleNumber: {
            type: String,
            required: true
        }
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
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
    role: {
        type: String,
        default: 'delivery-person'
    },
    otp: {
        type: Number
    },
    token: {
        type: String
    }
}, { timestamps: true });

deliveryPersonSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

deliveryPersonSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);

module.exports = DeliveryPerson;
