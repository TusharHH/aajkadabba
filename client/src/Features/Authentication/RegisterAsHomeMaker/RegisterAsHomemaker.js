import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useHomemakerStore from '../../../store/homemaker.store.js'; // Import store

const RegisterAsHomeMaker = () => {
  const [frontside, setFrontside] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
  const { signup } = useHomemakerStore(); // Use the signup action from Zustand store
  const [locationError, setLocationError] = useState('');
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Fetch Location
  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
            setLocationError('');
            resolve({ latitude, longitude });
          },
          (error) => {
            setLocationError('Unable to fetch location. Please allow location access and try again.');
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
      // Fetch location and combine with form data
      const locationData = await fetchLocation();

      // Create FormData object
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      formData.append('latitude', locationData.latitude);
      formData.append('longitude', locationData.longitude);

      if (data.profileImage[0]) {
        formData.append('profileImage', data.profileImage[0]); 
      }

      await signup(formData);
      navigate('/');
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  return (
    <>
      <div className='d-flex w-100 justify-content-center my-5'>
        <img src='./images/Logo_Text.jpg' alt=''></img>
      </div>
      <div className='d-flex w-100 justify-content-center'>
        <h1>Create your account</h1>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4 border p-3 shadow bg-white mb-5">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row-md-4 mt-1">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  {...register('name', { required: true })}
                  required
                />
                {errors.name && <div className="invalid-feedback">Name is required</div>}
              </div>
              
              <div className="row-md-4 mt-1">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  {...register('email', {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  required
                />
                {errors.email && <div className="invalid-feedback">Invalid email address</div>}
              </div>
              
              <div className="row-md-4 mt-1">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                  required
                />
                {errors.password && <div className="invalid-feedback">Password must be at least 8 characters long</div>}
              </div>
              
              <div className="row-md-4 mt-1">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  {...register('confirmPassword', { required: true, minLength: 8 })}
                  required
                />
                {errors.confirmPassword && <div className="invalid-feedback">Password must match</div>}
              </div>

              <div className="row-md-4 mt-1">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  id="address"
                  {...register('address', { required: true })}
                  required
                />
                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits' },
                  })}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
              </div>

              <div className="row-md-4 mt-1">
                <label htmlFor="profileImage" className="form-label">Profile Image</label>
                <input
                  type="file"
                  className={`form-control ${errors.profileImage ? 'is-invalid' : ''}`}
                  id="profileImage"
                  {...register('profileImage', { required: false })}
                />
              </div>

              {locationError && <div className="text-danger mt-2">{locationError}</div>}

              <div className="col-12 mt-2">
                <button
                  className="btn btn-custom"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAsHomeMaker;
