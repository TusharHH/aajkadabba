
import { create } from 'zustand';
import axios from 'axios';

const BACKEND_URL_HOMEMAKER = 'http://localhost:8000/api/v1/homemakers';

const getToken = () => {
    return localStorage.getItem('authToken');
};

const useHomemakerStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null,


    login: async (emailOrPhone, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL_HOMEMAKER}/login`, { email: emailOrPhone, password });
            const user = response.data.user;
            localStorage.setItem('authToken', response.data.data.user.token);
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    signup: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL_HOMEMAKER}/create-user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const user = response.data.user;
            localStorage.setItem('authToken', response.data.data.user.token);
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    getHomemakerById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${BACKEND_URL_HOMEMAKER}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            set({ user: response.data.homemaker, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    updateHomemaker: async (id, updatedData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${BACKEND_URL_HOMEMAKER}/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const user = response.data.homemaker;
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    deleteHomemaker: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${BACKEND_URL_HOMEMAKER}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            set({ user: null });
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    listHomemakers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${BACKEND_URL_HOMEMAKER}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            set({ homemakers: response.data.homemakers, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    createCloudKitchen: async (homemakerId, kitchenData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_URL_HOMEMAKER}/${homemakerId}/cloud-kitchen`, kitchenData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    updateCloudKitchen: async (homemakerId, kitchenData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${BACKEND_URL_HOMEMAKER}/${homemakerId}/cloud-kitchen`, kitchenData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


    deleteCloudKitchen: async (homemakerId) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${BACKEND_URL_HOMEMAKER}/${homemakerId}/cloud-kitchen`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            const user = JSON.parse(localStorage.getItem('user'));
            user.cloudKitchenDetails = null;
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, error: null });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useHomemakerStore;
