import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useHomemakerStore from '../../../store/homemaker.store.js';

const UploadItems = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const { signup } = useHomemakerStore();
    const [locationError, setLocationError] = useState('');

    const fetchLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setValue('latitude', latitude);
                        setValue('longitude', longitude);
                        setLocationError('');
                        resolve({ latitude, longitude });
                    },
                    (error) => {
                        setLocationError('Unable to fetch location. Please allow location access and try again.');

                        console.error('Location fetch error:', error.message);
                        reject(new Error('Location fetch error'));
                    }
                );
            } else {
                setLocationError('Geolocation is not supported by this browser.');
                console.error('Geolocation not supported');
                reject(new Error('Geolocation not supported'));
            }
        });
    };


    const onSubmit = async (data) => {
        try {
            const locationData = await fetchLocation();
            console.log(locationData)
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);
            formData.append('address', data.address);
            formData.append('phone', data.phone);
            formData.append('latitude', locationData.latitude || '');  // default to empty string if location fetch failed
            formData.append('longitude', locationData.longitude || ''); // default to empty string if location fetch failed


            if (data.profileImage[0]) {
                formData.append('profileImage', data.profileImage[0]);
                formData.append('profileImage', data.profileImage[0]);
            }

            // Attempt signup
            await signup(formData);
            navigate('/'); // Redirect on success
        } catch (error) {
            console.error('Error during sign up:', error.message);
        }
    };


    return (
        <>
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4 d-none d-md-block d-flex">
                            <img src='./images/LoginImage.jpg' alt='Logo' className='shadow-lg img-fluid bg-white ' style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-4 col-sm border p-3 shadow-lg bg-white mb-5  d-flex flex-column" style={{ height: '100vh', objectFit: 'cover' }}>
                            <div className='d-flex w-100 justify-content-center my-5'>
                                <img src='./images/Logo_Text.jpg' alt='Logo' />
                            </div>
                            <div className='d-flex w-100 justify-content-center'>
                                <p className='fw-bold' style={{ fontSize: "35px" }}>Upload Items</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate >
                                <>
                                    <div className="row-md-4 mt-1">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} custom-input`}
                                            id="name"
                                            placeholder='Alex'
                                            {...register('name', { required: true })}
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback">Name is required</div>}
                                    </div>

                                    <div className="row-md-4 mt-1">
                                        <label htmlFor="category" className="form-label">Category</label>
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
                                        <label htmlFor="name" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} custom-input`}
                                            id="name"
                                            placeholder='Alex'
                                            {...register('name', { required: true })}
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback">Name is required</div>}
                                    </div>



                                    <div className="row-md-4 mt-1">
                                        <label htmlFor="profileImage" className="form-label">Image</label>
                                        <input
                                            type="file"
                                            className={`form-control ${errors.profileImage ? 'is-invalid' : ''} custom-input`}
                                            id="profileImage"
                                            {...register('profileImage', {})}

                                        />
                                        {errors.profileImage && <div className="invalid-feedback">Profile image is required</div>}
                                    </div>


                                    {/* <div className='mt-3'>
                      <button className="fs-6 btn btn-custom-green px-4 w-100" type='button' onClick={fetchLocation}>
                        <i className="bi bi-geo-alt me-2 text-white"></i>
                        Get Location
                      </button>
                    </div> */}

                                    <div className="row-md-4 mt-1">
                                        <label htmlFor="name" className="form-label">Making Time</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''} custom-input`}
                                            id="name"
                                            placeholder='Alex'
                                            {...register('name', { required: true })}
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback">Name is required</div>}
                                    </div>



                                    <div className='mt-5'>
                                        <button className="fs-6 btn btn-custom px-4 w-100" type='button'>
                                            Register
                                        </button>
                                    </div>
                                </>
                                {locationError && <div className="text-danger mt-2">{locationError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadItems;
