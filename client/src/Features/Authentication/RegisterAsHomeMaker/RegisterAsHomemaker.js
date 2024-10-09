import React,{useState} from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

const RegisterAsHomeMaker = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting },setValue } = useForm();
  const [locationFetched, setLocationFetched] = useState(false);
  const [locationError, setLocationError] = useState('');

  const onSubmit = async (data) => {
    if (!locationFetched) {
      alert("Please fetch your location before submitting the form.");
      return;
    }

    try {
      const response = await Axios.post('http://localhost:5001/api/v1/auth/signup', data);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue('latitude', latitude);
          setValue('longitude', longitude);
          setLocationFetched(true);
          setLocationError('');
          console.log('Location fetched:', latitude, longitude);
        },
        (error) => {
          setLocationError('Unable to fetch location. Please allow location access and try again.');
          console.error(error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
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
            <form onSubmit={handleSubmit()} noValidate>

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
                  {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
                  required
                />
                {errors.email && <div className="invalid-feedback">Invalid email address</div>}
              </div>
              <div className="row-md-4 mt-1 ">
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
              <div className="row-md-4 mt-1 ">
                <label htmlFor="password" className="form-label">Confirm Password</label>
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
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  id="address"
                  {...register('address', { required: 'Address is required' })}
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
                    pattern: {
                      value: /^[0-9]{10}$/,  // Regex to allow only 10 digits
                      message: 'Phone number must be exactly 10 digits'
                    }
                  })}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
              </div>
              <div className="row-md-4 mt-3">
                <button type="button" className="btn btn-custom w-100 my-4" onClick={fetchLocation}>
                  Fetch Current Location
                </button>
                {locationError && <div className="text-danger mt-2">{locationError}</div>}
              </div>
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
  )
}

export default RegisterAsHomeMaker;