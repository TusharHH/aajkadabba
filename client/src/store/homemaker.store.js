import { create } from 'zustand';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/users';

const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {

        localStorage.removeItem("user");
        return null;
    }
    try {
        return JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing stored user data:", error);

        localStorage.removeItem("user");
        return null;
    }
};

const useAuthStore = create((set) => ({
    user: getStoredUser(),
    loading: false,
    error: null,


    signup: async (name, email, phone, avatar, pasword, role, location) => {

        let checkPhone, checkAvatar;
        if (phone) {
            checkPhone = phone;
        };
        if (avatar) {
            checkAvatar = avatar;
        }

        const formData = {
            name, email, checkAvatar, checkPhone, pasword, role, location
        }
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, formData);

            set({ user: response.data.data.user, loading: false, error: null });
            localStorage.setItem('user', response.data.data.user);

        } catch (err) {
            set({
                error: err.response?.data?.message || 'Signup failed',
                loading: false,
            });
        }
    },


    login: async (email, passwords) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL}/login`, { email, passwords });
            set({ user: response.data.data.user, loading: false, error: null });
            localStorage.setItem('user', response.data.data.user);
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Login failed',
                loading: false,
            });
        }
    },


    logout: () => {
        set({ user: null });
    },
}));

export default useAuthStore;
