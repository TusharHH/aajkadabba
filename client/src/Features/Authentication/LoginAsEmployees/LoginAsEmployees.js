import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginAsEmployees = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-4 d-none d-md-block">
              <img src='./images/LoginImage.jpg' alt='Logo' className='shadow-lg bg-white' style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
            <div className="col-md-4 col-sm border p-3 shadow-lg bg-white mb-5  d-flex flex-column" style={{ height: '100vh', objectFit: 'cover' }}>
              <div className='d-flex w-100 justify-content-center my-5'>
                <img src='./images/Logo_Text.jpg' alt='Logo' />
              </div>
              <div className='d-flex w-100 justify-content-center'>
                {frontside?<p className='fw-bold' style={{ fontSize: "35px" }}>Create your account</p>:<p className='fw-bold' style={{ fontSize: "35px" }}>Add Personal Info</p>}
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate >
                {frontside ? (
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

export default LoginAsEmployees