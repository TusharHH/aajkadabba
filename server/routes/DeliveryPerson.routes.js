const express = require('express');
const route = express.Router();
const { upload } = require('../middlewares/multer.middleware.js');
const {
    signup,
    login,
    getDeliveryPersonById,
    updateDeliveryPerson,
    deleteDeliveryPerson,
    listDeliveryPersons
} = require('../controller/DeliveryPerson.controller.js');


route.post('/signup', upload.single('profileImage'), signup);
route.post('/login', login);


route.get('/:id', getDeliveryPersonById);
route.put('/:id', upload.single('profileImage'), updateDeliveryPerson);
route.delete('/:id', deleteDeliveryPerson);
route.get('/', listDeliveryPersons);

module.exports = route;
