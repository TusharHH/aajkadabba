import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useHomemakerStore from '../../../store/homemaker.store.js';

const LoginAsHomemaker = () => {
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
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-4 d-none d-md-block">
              <img src='./images/LoginImage.jpg' alt='Logo' className='shadow-lg bg-white' style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
            </div>
            <div className="col-md-4 col-sm border p-3 shadow-lg bg-white mb-5  d-flex flex-column" style={{ height: '100vh', objectFit: 'cover' }}>
              <div className='d-flex w-100 justify-content-center my-5'>
                <img src='./images/Logo_Text.jpg' alt='Logo' />
              </div>
              <div className='d-flex w-100 justify-content-center'>
                {frontside?<p className='fw-bold' style={{ fontSize: "35px" }}>Login your account</p>:<p className='fw-bold' style={{ fontSize: "35px" }}>Add Personal Info</p>}
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate >
                {frontside ? (
                  <>

                    <div className="row-md-4 mt-1">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''} custom-input`}
                        id="email"
                        placeholder='alex.d@gmail.com'
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
                    <div className='mt-5'>
                      <button className="fs-6 btn btn-custom px-4 w-100" type='button' onClick={() => { setFrontside(false) }}>
                        Login
                      </button>
                    </div>

                    <div className="row-md-4 mt-1">
                      <label htmlFor="email" className="form-label">Create New Account? <Link className="fs-6" style={{color:"#FF6000"}} to="/signup">SignUp</Link></label>
                    </div>
                  </>
                ) : (
                  <>

                    <div className="row-md-4 mt-1">
                      <label htmlFor="profileImage" className="form-label">Profile Image</label>
                      <input
                        type="file"
                        className={`form-control ${errors.profileImage ? 'is-invalid' : ''}`}
                        id="profileImage"
                        {...register('profileImage', { required: true })}
                        style={{ border: "2px solid #FF6000" }}
                      />
                      {errors.profileImage && <div className="invalid-feedback">Profile image is required</div>}
                    </div>

                    <div className='mt-3'>
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
      </div>
    </>
  )
}

export default LoginAsHomemaker