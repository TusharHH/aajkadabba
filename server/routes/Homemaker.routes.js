const express = require('express');

const route = express.Router();

const { upload } = require('../middlewares/multer.middleware.js');

const {
    login,
    signup,
    getHomemakerById,
    updateHomemaker,
    deleteHomemaker,
    listHomemakers,
    createCloudKitchen,
    updateCloudKitchen,
    deleteCloudKitchen
} = require('../controller/Homemaker.controller.js');

route.post('/login-user', login);
route.post('/create-user', upload.single('profileImage'), signup);
route.get('/user/:id', getHomemakerById);
route.get('/users', listHomemakers);
route.put('/user/:id', upload.single('profileImage'), updateHomemaker);
route.delete('/user/:id', deleteHomemaker);


// Cloud Kitchen routes
route.post('/user/:id/cloud-kitchen', createCloudKitchen);
route.put('/user/:id/cloud-kitchen', updateCloudKitchen);
route.delete('/user/:id/cloud-kitchen', deleteCloudKitchen);


module.exports = route;
