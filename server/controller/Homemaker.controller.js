const Homemaker = require('../models/Homemaker.model.js');

const ApiResponse = require('../utils/ApiResponse.utils.js');
const AsyncHandler = require('../utils/AsyncHandler.utils.js');

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

    ApiResponse(res, 200, true, 'Homemaker logged in succesfully !!', { user });

});

exports.models = {
    login
};

