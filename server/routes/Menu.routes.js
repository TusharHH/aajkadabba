const express = require('express');
const route = express.Router();
const { upload } = require('../middlewares/multer.middleware.js');

const {
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    listMenus
} = require('../controller/Menu.controller.js');

route.post('/', upload.single('imageUrl'), createMenu);
route.get('/:id', getMenuById);
route.get('/', listMenus);

route.put('/:id', upload.single('imageUrl'), updateMenu);
route.delete('/:id', deleteMenu);

module.exports = route;
