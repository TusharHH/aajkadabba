import { create } from 'zustand';
import axios from 'axios';

const useHomemakerStore = create((set) => ({
    user: null,
    token: null,

    signup: async (formData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/homemakers/create-user', formData);
            set({ user: response.data.user, token: response.data.token });
            return response.data;
        } catch (error) {
            console.error('Signup Error:', error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/homemakers/login', { email, password });
            set({ user: response.data.user, token: response.data.token });
            return response.data;
        } catch (error) {
            console.error('Login Error:', error.response.data.message);
            throw new Error(error.response.data.message);
        }
    },
}));

export default useHomemakerStore;
