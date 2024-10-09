import { useState } from "react";
import { useForm } from "react-hook-form";

export default function HomemakerMenu() {

    const [menus, setMenus] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [currentItem, setCurrentItem] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();

    const handleAddItem = () => {
        if (currentItem.trim() !== "" && currentPrice.trim() !== "" && currentImage) {
            setMenuItems((prevItems) => [...prevItems, { name: currentItem.trim(), price: currentPrice.trim(), image: currentImage }]);
            setCurrentItem(''); // Clear the item input field
            setCurrentPrice(''); // Clear the price input field
            setCurrentImage(null); // Clear the image input field
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCurrentImage(file);
    };

    const handleFormSubmit = (formValues) => {
        // Create a FormData object
        const formData = new FormData();

        // Add basic fields
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('category', formValues.category);

        // Add menu items (with images)
        menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, item.price);
            formData.append(`menuItems[${index}][image]`, item.image);
        });

        // Convert FormData to a JSON object
        const data = {};
        formData.forEach((value, key) => {
            if (key.includes('image')) {
                // If it's an image file, add it directly without converting it to JSON
                data[key] = value;
            } else {
                data[key] = value;
            }
        });

        console.log('Form Data as JSON:', data);
    };

    return (
        <>
            <div className="d-flex justify-content-center mt-4">
                <div className="container">
                    <h2>Your Menus</h2>
                    <div className="mt-4">
                        {
                            menus.length === 0 ?
                                <h5 style={{ color: "gray" }}>No menus created...</h5>
                                :
                                <div>
                                    {/* Add menu */}
                                </div>
                        }
                    </div>

                    <div className="mt-4">
                        <>
                            {/* Button trigger modal */}
                            <button
                                type="button"
                                className="btn btn-custom"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Create new menu
                            </button>

                            {/* Modal */}
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Create Menu</h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                                <div className="row-md-4 mt-1">
                                                    <label htmlFor="title" className="form-label">Business Name:</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.title ? 'is-invalid' : ''} custom-input input-width`}
                                                        id="title"
                                                        {...register('title', { required: true })}
                                                        required
                                                    />
                                                    {errors.title && <div className="invalid-feedback">Name is required</div>}
                                                </div>
                                                <div className="row-md-4 mt-1">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <textarea
                                                        className={`form-control ${errors.description ? 'is-invalid' : ''} custom-input `}
                                                        id="description"
                                                        {...register('description', { required: true })}
                                                        required
                                                    />
                                                    {errors.description && <div className="invalid-feedback">Description is required!</div>}
                                                </div>
                                                <div className="row-md-4 mt-1">
                                                    <label className="my-2">Category: </label>
                                                    <select
                                                        className={`form-control ${errors.category ? 'is-invalid' : ''} custom-input`}
                                                        id="category"
                                                        {...register('category', { required: true })}
                                                        required
                                                    >
                                                        <option value="">Select a category</option>
                                                        <option value="Breakfast">Breakfast</option>
                                                        <option value="Lunch">Lunch</option>
                                                        <option value="Dinner">Dinner</option>
                                                    </select>
                                                    {errors.category && <div className="invalid-feedback">Category is required</div>}
                                                </div>
                                                <div className="row-md-4 mt-1">
                                                    <label htmlFor="menuItem" className="form-label">Menu Item:</label>
                                                    <div className="d-flex">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="menuItem"
                                                            placeholder="Item name"
                                                            value={currentItem}
                                                            onChange={(e) => setCurrentItem(e.target.value)}
                                                        />
                                                        <input
                                                            type="number"
                                                            className="form-control ms-2"
                                                            id="menuPrice"
                                                            placeholder="Price"
                                                            value={currentPrice}
                                                            onChange={(e) => setCurrentPrice(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row-md-4 mt-1">
                                                    <label htmlFor="menuImage" className="form-label">Item Image:</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="menuImage"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                                <div className="row-md-4 mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mt-2"
                                                        onClick={handleAddItem}
                                                        disabled={!currentItem || !currentPrice || !currentImage}
                                                    >
                                                        Add Item
                                                    </button>
                                                </div>
                                                <div className="row-md-4 mt-3">
                                                    <h6>Menu Items:</h6>
                                                    <ul>
                                                        {
                                                            menuItems.length > 0 ?
                                                                menuItems.map((item, index) => (
                                                                    <li key={index}>
                                                                        {item.name} - ${item.price}
                                                                        <br />
                                                                        <img
                                                                            src={URL.createObjectURL(item.image)}
                                                                            alt={item.name}
                                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginTop: '5px' }}
                                                                        />
                                                                    </li>
                                                                )) : <h6 style={{ color: "gray" }}>No items added</h6>
                                                        }
                                                    </ul>
                                                </div>
                                                <div className='mt-5'>
                                                    <button className="fs-6 btn btn-custom px-4 w-100" type='submit'>
                                                        Create
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}
