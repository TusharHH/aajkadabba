const jwt = require('jsonwebtoken');

const Homemaker = require('../models/Homemaker.model.js');

const ApiResponse = require('../utils/ApiResponse.utils.js');
const AsyncHandler = require('../utils/AsyncHandler.utils.js');

const {
    uploadOnCloudinary
} = require('../utils/cloudinary.util.js');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const login = AsyncHandler(async (req, res) => {

    const { email, phoneNumber, password } = req.body;

    if (!email && !phoneNumber) {
        ApiResponse(res, 400, false, 'Please provide either an email or phone number !!', {});
    }

    if (!password) {
        ApiResponse(res, 400, false, 'Please provide your password !!', {});
    }

    let user;

    if (email) {
        user = await Homemaker.findOne({ email });
    } else if (phoneNumber) {
        user = await Homemaker.findOne({ phoneNumber });
    }

    if (!user) {
        ApiResponse(res, 404, false, 'User not found !!');
    }

    const isPasswordMatch = await user.verifyPassword(password);

    if (!isPasswordMatch) {
        ApiResponse(res, 401, false, 'Invalid Password !!', {});
    }

    const token = generateToken(user._id);

    user.token = token;

    ApiResponse(res, 200, true, 'Homemaker logged in succesfully !!', { user });

});

const signup = AsyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber, address, latitude, longitude } = req.body;

    if (!name || !email || !password || !phoneNumber || !address || !latitude || !longitude) {
        return ApiResponse(res, 400, false, 'All fields are required, including location coordinates!', {});
    }

    const existingUser = await Homemaker.findOne({ email });
    if (existingUser) {
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

    const user = new Homemaker({
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

    ApiResponse(res, 201, true, 'Homemaker registered successfully!', { user, token });
});

const getHomemakerById = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;

    const homemaker = await Homemaker.findById(homemakerId).populate('cloudKitchenDetails.menuItems reviews activeOrders');

    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    }

    ApiResponse(res, 200, true, 'Homemaker retrieved successfully!', { homemaker });
});

const updateHomemaker = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;

    const homemaker = await Homemaker.findById(homemakerId);

    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    }

    const { name, email, phoneNumber, address } = req.body;

    if (name) homemaker.name = name;
    if (email) homemaker.email = email;
    if (phoneNumber) homemaker.phoneNumber = phoneNumber;
    if (address) homemaker.address = address;

    if (req.file) {

        if (homemaker.profileImage) {
            const publicId = homemaker.profileImage.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse && uploadResponse.url) {
            homemaker.profileImage = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading new profile image!', {});
        }

    }

    await homemaker.save();

    ApiResponse(res, 200, true, 'Homemaker updated successfully!', { homemaker });
});

const deleteHomemaker = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;

    const homemaker = await Homemaker.findById(homemakerId);

    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    };

    if (homemaker.profileImage) {
        const publicId = homemaker.profileImage.split('/').pop().split('.')[0];
        await deleteFromCloudinary(publicId);
    };

    await homemaker.deleteOne();

    ApiResponse(res, 200, true, 'Homemaker deleted successfully!', {});
});

const listHomemakers = AsyncHandler(async (req, res) => {
    const homemakers = await Homemaker.find().populate('cloudKitchenDetails.menuItems reviews activeOrders');
    ApiResponse(res, 200, true, 'Homemakers retrieved successfully!', { homemakers });
});

const createCloudKitchen = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;
    const { name, description } = req.body;


    const homemaker = await Homemaker.findById(homemakerId);
    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    }


    homemaker.cloudKitchenDetails = {
        name,
        description,
        rating: 0,
        menuItems: []
    };

    await homemaker.save();

    ApiResponse(res, 201, true, 'Cloud kitchen created successfully!', { cloudKitchenDetails: homemaker.cloudKitchenDetails });
});

const updateCloudKitchen = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;
    const { name, description } = req.body;


    const homemaker = await Homemaker.findById(homemakerId);
    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    }


    if (homemaker.cloudKitchenDetails) {
        if (name) homemaker.cloudKitchenDetails.name = name;
        if (description) homemaker.cloudKitchenDetails.description = description;

        await homemaker.save();

        ApiResponse(res, 200, true, 'Cloud kitchen updated successfully!', { cloudKitchenDetails: homemaker.cloudKitchenDetails });
    } else {
        ApiResponse(res, 404, false, 'Cloud kitchen not found!', {});
    }
});

const deleteCloudKitchen = AsyncHandler(async (req, res) => {
    const homemakerId = req.params.id;


    const homemaker = await Homemaker.findById(homemakerId);
    if (!homemaker) {
        return ApiResponse(res, 404, false, 'Homemaker not found!', {});
    }

    if (homemaker.cloudKitchenDetails) {
        homemaker.cloudKitchenDetails = {};

        await homemaker.save();

        ApiResponse(res, 200, true, 'Cloud kitchen deleted successfully!', {});
    } else {
        ApiResponse(res, 404, false, 'Cloud kitchen not found!', {});
    }
});


module.exports = {
    login,
    signup,
    getHomemakerById,
    updateHomemaker,
    deleteHomemaker,
    listHomemakers,
    createCloudKitchen,
    updateCloudKitchen,
    deleteCloudKitchen
};