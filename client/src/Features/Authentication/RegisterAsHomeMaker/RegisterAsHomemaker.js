import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useHomemakerStore from '../../../store/homemaker.store.js';

const RegisterAsHomeMaker = () => {
  const [frontside, setFrontside] = useState(true);
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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4 border p-3 shadow bg-white mb-5 rounded-4">
            <div className='d-flex w-100 justify-content-center my-5'>
              <img src='./images/Logo_Text.jpg' alt='Logo' />
            </div>
            <div className='d-flex w-100 justify-content-center'>
              <p className='fw-bold' style={{fontSize:"35px"}}>Create your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {frontside ? (
                <>
                  <div className="row-md-4 mt-1">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''} custom-input`}
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
                      className={`form-control ${errors.email ? 'is-invalid' : ''} custom-input`}
                      id="email"
                      {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                      required
                      
                    />
                    {errors.email && <div className="invalid-feedback">Invalid email address</div>}
                  </div>

                  <div className="row-md-4 mt-1">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''} custom-input`}
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
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} custom-input`}
                      id="confirmPassword"
                      {...register('confirmPassword', { required: true, minLength: 8 })}
                      required
                      
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">Password must match</div>}
                  </div>

                  <div className='mt-5'>
                    <button className="fs-6 btn btn-custom px-4 w-100" type='button' onClick={() => { setFrontside(false) }}>
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='mt-5'>
                    <button className="fs-6 btn btn-custom-green px-4 w-100" type='button' onClick={fetchLocation}>
                      <i className="bi bi-geo-alt me-2 text-white"></i>
                      Get Location
                    </button>
                  </div>

                  <div className="row-md-4 mt-1">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''} custom-input`}
                      id="phone"
                      {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })}
                      required
                      
                    />
                    {errors.phone && <div className="invalid-feedback">Valid phone number is required (10 digits)</div>}
                  </div>

                  <div className="row-md-4 mt-1">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''} custom-input`}
                      id="address"
                      {...register('address', { required: true, minLength: 5 })}
                      required
                      
                    />
                    {errors.address && <div className="invalid-feedback">Address must be at least 5 characters long</div>}
                  </div>

                  <div className='mt-5'>
                    <button className="fs-6 btn btn-custom px-4 w-100" type='submit'>
                      Register
                    </button>
                  </div>
                </>
              )}
              {locationError && <div className="text-danger mt-2">{locationError}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAsHomeMaker;
