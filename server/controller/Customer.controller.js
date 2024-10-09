const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer.model.js');
const ApiResponse = require('../utils/ApiResponse.utils.js');
const AsyncHandler = require('../utils/AsyncHandler.utils.js');
const { uploadOnCloudinary } = require('../utils/cloudinary.util.js');


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


const signup = AsyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, address, latitude, longitude } = req.body;

    if (!name || !email || !password || !phoneNumber || !address || !latitude || !longitude) {
        return ApiResponse(res, 400, false, 'All fields are required, including location coordinates!', {});
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
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

    const user = new Customer({
        name,
        email,
        password,
        phoneNumber,
        address,
        profileImage: profileImageUrl,
        location: {
            latitude,
            longitude
        }
    });

    await user.save();

    const token = generateToken(user._id);

    user.token = token;
    await user.save();

    ApiResponse(res, 201, true, 'Customer registered successfully!', { user });
});


const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return ApiResponse(res, 400, false, 'Please provide your email !!', {});
    }

    if (!password) {
        return ApiResponse(res, 400, false, 'Please provide your password !!', {});
    }

    const user = await Customer.findOne({ email });
    if (!user) {
        return ApiResponse(res, 404, false, 'Customer not found !!', {});
    }

    const isPasswordMatch = await user.verifyPassword(password);
    if (!isPasswordMatch) {
        return ApiResponse(res, 401, false, 'Invalid Password !!', {});
    }

    const token = generateToken(user._id);
    user.token = token;

    ApiResponse(res, 200, true, 'Customer logged in successfully !!', { user });
});


const getCustomerById = AsyncHandler(async (req, res) => {
    const customerId = req.params.id;

    const user = await Customer.findById(customerId).populate('favoriteHousemakers orderHistory');
    if (!user) {
        return ApiResponse(res, 404, false, 'Customer not found!', {});
    }

    ApiResponse(res, 200, true, 'Customer retrieved successfully!', { user });
});


const updateCustomer = AsyncHandler(async (req, res) => {
    const customerId = req.params.id;

    const user = await Customer.findById(customerId);
    if (!user) {
        return ApiResponse(res, 404, false, 'Customer not found!', {});
    }

    const { name, email, phoneNumber, address } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    if (req.file) {
        if (user.profileImage) {
            const publicId = user.profileImage.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse && uploadResponse.url) {
            user.profileImage = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading new profile image!', {});
        }
    }

    await user.save();

    ApiResponse(res, 200, true, 'Customer updated successfully!', { user });
});


const deleteCustomer = AsyncHandler(async (req, res) => {
    const customerId = req.params.id;

    const user = await Customer.findById(customerId);
    if (!user) {
        return ApiResponse(res, 404, false, 'Customer not found!', {});
    }

    if (user.profileImage) {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await deleteFromCloudinary(publicId);
    }

    await user.deleteOne();

    ApiResponse(res, 200, true, 'Customer deleted successfully!', {});
});


const listCustomers = AsyncHandler(async (req, res) => {
    const user = await Customer.find().populate('favoriteHousemakers orderHistory');
    ApiResponse(res, 200, true, 'Customers retrieved successfully!', { user });
});

module.exports = {
    signup,
    login,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    listCustomers
};
