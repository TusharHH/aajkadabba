import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const RegisterAsHomeMaker = () => {
  const [frontside, setFrontside] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
  const [locationError, setLocationError] = useState('');

  // Track latitude and longitude state separately
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Function to fetch location when the user clicks Sign Up
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

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Fetch the user's current location before submission
      const locationData = await fetchLocation();
      console.log("", locationData);
      // Include the fetched location data in the form submission
      const formData = {
        ...data,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };

      // Sending data to backend
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  return (
    
  );
}

export default RegisterAsHomeMaker;
