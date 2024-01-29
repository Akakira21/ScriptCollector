// user.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const addUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/addUser`, userData);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const getUserByEmail = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/getUserByEmail`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllUsers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};
