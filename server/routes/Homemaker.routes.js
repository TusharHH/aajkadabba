const express = require('express');
const route = express.Router();

const {
    login,
    signup
} = require('../controller/Homemaker.controller.js');

route.post('/login-user', login);
route.post('/create-user', signup);
// route.get('/user/:id', getHomemakerById);
// route.get('/users', listHomemakers);
// route.put('/user/:id', updateHomemaker);
// route.delete('/user/:id', deleteHomemaker);

// route.post('/user/:id/cloud-kitchen', createCloudKitchen);
// route.put('/user/:id/cloud-kitchen', updateCloudKitchen);
// route.delete('/user/:id/cloud-kitchen', deleteCloudKitchen);

module.exports = route;
