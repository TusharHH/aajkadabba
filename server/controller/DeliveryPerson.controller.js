const jwt = require('jsonwebtoken');
const DeliveryPerson = require('../models/DeliveryPerson.model.js');
const ApiResponse = require('../utils/ApiResponse.utils.js');
const AsyncHandler = require('../utils/AsyncHandler.utils.js');
const { uploadOnCloudinary } = require('../utils/cloudinary.util.js');


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


const signup = AsyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, vehicleType, vehicleNumber, latitude, longitude } = req.body;

    if (!name || !email || !password || !phoneNumber || !vehicleType || !vehicleNumber || !latitude || !longitude) {
        return ApiResponse(res, 400, false, 'All fields are required, including location coordinates!', {});
    }

    const existingDeliveryPerson = await DeliveryPerson.findOne({ email });
    if (existingDeliveryPerson) {
        return ApiResponse(res, 409, false, 'Email already in use !!', {});
    }

    let profileImageUrl = null;

    if (req.file) {
        const avatarFilePath = req.file.path;
        const uploadResponse = await uploadOnCloudinary(avatarFilePath);
        if (uploadResponse && uploadResponse.url) {
            profileImageUrl = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading profile image !!', {});
        }
    }

    const deliveryPerson = new DeliveryPerson({
        name,
        email,
        password,
        phoneNumber,
        profileImage: profileImageUrl,
        vehicleDetails: {
            vehicleType,
            vehicleNumber
        },
        location: {
            latitude,
            longitude
        }
    });

    await deliveryPerson.save();

    const token = generateToken(deliveryPerson._id);

    deliveryPerson.token = token; 
    await deliveryPerson.save();

    ApiResponse(res, 201, true, 'Delivery person registered successfully!', { deliveryPerson });
});


const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return ApiResponse(res, 400, false, 'Please provide your email !!', {});
    }

    if (!password) {
        return ApiResponse(res, 400, false, 'Please provide your password !!', {});
    }

    const deliveryPerson = await DeliveryPerson.findOne({ email });
    if (!deliveryPerson) {
        return ApiResponse(res, 404, false, 'Delivery person not found !!', {});
    }

    const isPasswordMatch = await deliveryPerson.verifyPassword(password);
    if (!isPasswordMatch) {
        return ApiResponse(res, 401, false, 'Invalid Password !!', {});
    }

    const token = generateToken(deliveryPerson._id);
    deliveryPerson.token = token;

    ApiResponse(res, 200, true, 'Delivery person logged in successfully !!', { deliveryPerson });
});


const getDeliveryPersonById = AsyncHandler(async (req, res) => {
    const deliveryPersonId = req.params.id;

    const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId).populate('assignedOrders');
    if (!deliveryPerson) {
        return ApiResponse(res, 404, false, 'Delivery person not found!', {});
    }

    ApiResponse(res, 200, true, 'Delivery person retrieved successfully!', { deliveryPerson });
});


const updateDeliveryPerson = AsyncHandler(async (req, res) => {
    const deliveryPersonId = req.params.id;

    const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);
    if (!deliveryPerson) {
        return ApiResponse(res, 404, false, 'Delivery person not found!', {});
    }

    const { name, email, phoneNumber, vehicleType, vehicleNumber } = req.body;

    if (name) deliveryPerson.name = name;
    if (email) deliveryPerson.email = email;
    if (phoneNumber) deliveryPerson.phoneNumber = phoneNumber;
    if (vehicleType) deliveryPerson.vehicleDetails.vehicleType = vehicleType;
    if (vehicleNumber) deliveryPerson.vehicleDetails.vehicleNumber = vehicleNumber;

    if (req.file) {
        if (deliveryPerson.profileImage) {
            const publicId = deliveryPerson.profileImage.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId); 
        }

        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse && uploadResponse.url) {
            deliveryPerson.profileImage = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading new profile image!', {});
        }
    }

    await deliveryPerson.save();

    ApiResponse(res, 200, true, 'Delivery person updated successfully!', { deliveryPerson });
});


const deleteDeliveryPerson = AsyncHandler(async (req, res) => {
    const deliveryPersonId = req.params.id;

    const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);
    if (!deliveryPerson) {
        return ApiResponse(res, 404, false, 'Delivery person not found!', {});
    }

    if (deliveryPerson.profileImage) {
        const publicId = deliveryPerson.profileImage.split('/').pop().split('.')[0];
        await deleteFromCloudinary(publicId); 
    }

    await deliveryPerson.deleteOne();

    ApiResponse(res, 200, true, 'Delivery person deleted successfully!', {});
});

const listDeliveryPersons = AsyncHandler(async (req, res) => {
    const deliveryPersons = await DeliveryPerson.find().populate('assignedOrders');
    ApiResponse(res, 200, true, 'Delivery persons retrieved successfully!', { deliveryPersons });
});

module.exports = {
    signup,
    login,
    getDeliveryPersonById,
    updateDeliveryPerson,
    deleteDeliveryPerson,
    listDeliveryPersons
};
