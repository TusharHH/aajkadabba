const Menu = require('../models/Menu.model.js');
const ApiResponse = require('../utils/ApiResponse.utils.js');
const AsyncHandler = require('../utils/AsyncHandler.utils.js');
const { uploadOnCloudinary } = require('../utils/cloudinary.util.js');


const createMenu = AsyncHandler(async (req, res) => {
    const { homemaker, title, description, price, category, items } = req.body;

    if (!homemaker || !title || !description || !price || !category || !items) {
        return ApiResponse(res, 400, false, 'All fields are required!', {});
    }

    let imageUrl = null;

    if (req.file) {
        const imageFilePath = req.file.path;
        const uploadResponse = await uploadOnCloudinary(imageFilePath);
        if (uploadResponse && uploadResponse.url) {
            imageUrl = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading image!', {});
        }
    }

    const menu = new Menu({
        homemaker,
        title,
        description,
        price,
        imageUrl,
        category,
        items
    });

    await menu.save();

    ApiResponse(res, 201, true, 'Menu created successfully!', { menu });
});


const getMenuById = AsyncHandler(async (req, res) => {
    const menuId = req.params.id;

    const menu = await Menu.findById(menuId).populate('homemaker');
    if (!menu) {
        return ApiResponse(res, 404, false, 'Menu not found!', {});
    }

    ApiResponse(res, 200, true, 'Menu retrieved successfully!', { menu });
});


const updateMenu = AsyncHandler(async (req, res) => {
    const menuId = req.params.id;

    const menu = await Menu.findById(menuId);
    if (!menu) {
        return ApiResponse(res, 404, false, 'Menu not found!', {});
    }

    const { title, description, price, isAvailable, category, items } = req.body;

    if (title) menu.title = title;
    if (description) menu.description = description;
    if (price) menu.price = price;
    if (isAvailable !== undefined) menu.isAvailable = isAvailable;
    if (category) menu.category = category;
    if (items) menu.items = items;

    if (req.file) {
        if (menu.imageUrl) {
            const publicId = menu.imageUrl.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (uploadResponse && uploadResponse.url) {
            menu.imageUrl = uploadResponse.url;
        } else {
            return ApiResponse(res, 500, false, 'Error uploading new image!', {});
        }
    }

    await menu.save();

    ApiResponse(res, 200, true, 'Menu updated successfully!', { menu });
});


const deleteMenu = AsyncHandler(async (req, res) => {
    const menuId = req.params.id;

    const menu = await Menu.findById(menuId);
    if (!menu) {
        return ApiResponse(res, 404, false, 'Menu not found!', {});
    }

    if (menu.imageUrl) {
        const publicId = menu.imageUrl.split('/').pop().split('.')[0];
        await deleteFromCloudinary(publicId);
    }

    await menu.deleteOne();

    ApiResponse(res, 200, true, 'Menu deleted successfully!', {});
});


const listMenus = AsyncHandler(async (req, res) => {
    const menus = await Menu.find().populate('homemaker');
    ApiResponse(res, 200, true, 'Menus retrieved successfully!', { menus });
});

module.exports = {
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    listMenus
};
