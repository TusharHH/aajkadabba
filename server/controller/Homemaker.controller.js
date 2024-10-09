const Homemaker = require('../models/Homemaker.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Sign JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Homemaker Registration
const signup = async (req, res) => {

    console.log(req.body);
    try {

        const { name, email, password, phone, address } = req.body;

        const existingUser = await Homemaker.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newHomemaker = new Homemaker({
            name,
            email,
            password,
            phoneNumber: phone,
            address,
        });

        await newHomemaker.save();

        const token = generateToken(newHomemaker);

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: newHomemaker._id,
                name: newHomemaker.name,
                email: newHomemaker.email,
                phoneNumber: newHomemaker.phoneNumber,
                address: newHomemaker.address,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in registration', error: error.message });
    }
};

// Homemaker Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const homemaker = await Homemaker.findOne({ email });
        if (!homemaker) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await homemaker.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = generateToken(homemaker);

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: homemaker._id,
                name: homemaker.name,
                email: homemaker.email,
                phoneNumber: homemaker.phoneNumber,
                address: homemaker.address,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in login', error: error.message });
    }
};

module.exports = {
    signup,
    login,
};
