import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useHomemakerStore from '../../../store/homemaker.store.js';

const RegisterAsHomeMaker = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { signup } = useHomemakerStore();
  const navigate = useNavigate();
  const [locationError, setLocationError] = useState();

  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setValue('latitude', latitude);
            setValue('longitude', longitude);
            resolve({ latitude, longitude });
          },
          (error) => {
            setLocationError('Unable to fetch location.');
            reject(new Error('Location fetch error'));
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation not supported'));
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      const locationData = await fetchLocation();
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        latitude: locationData.latitude || '',
        longitude: locationData.longitude || ''
      };
      console.log('Form Data:', formData);
      await signup(formData);
      navigate('/'); // Redirect on success
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-4 border p-3 shadow bg-white mb-5 rounded-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                {...register('name', { required: true })}
              />
              {errors.name && <div className="invalid-feedback">Name is required</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', { required: true })}
              />
              {errors.email && <div className="invalid-feedback">Valid email is required</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', { required: true })}
              />
              {errors.password && <div className="invalid-feedback">Password is required</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                {...register('phone', { required: true })}
              />
              {errors.phone && <div className="invalid-feedback">Phone is required</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                {...register('address', { required: true })}
              />
              {errors.address && <div className="invalid-feedback">Address is required</div>}
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>  
    </div>
  );
};

export default RegisterAsHomeMaker;
