const express = require('express');

const route = express.Router();

const {
    login
} = require('../controller/Homemaker.controller.js');

route.post('/user', login);

exports.model = route;
