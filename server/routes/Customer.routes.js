const express = require('express');
const route = express.Router();
const { upload } = require('../middlewares/multer.middleware.js');

const {
    signup,
    login,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    listCustomers
} = require('../controller/Customer.controller.js');


route.post('/signup', upload.single('profileImage'), signup);
route.post('/login', login);

route.get('/:id', getCustomerById);
route.put('/:id', upload.single('profileImage'), updateCustomer);
route.delete('/:id', deleteCustomer);
route.get('/', listCustomers);

module.exports = route;
