import axios from 'axios';

const API_BASE_URL = 'http://localhost:8091/api'; // Base URL of your backend API

// API functions to interact with the backend
const userApi = {
  // Register a user
  registerUser: async (formData) => {
    return axios.post(`${API_BASE_URL}/users/register`, formData, { 
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // Login user
  loginUser: async (email, password) => {
    return axios.post(`${API_BASE_URL}/users/login`, { email, password });
  },

  // Logout user
  logoutUser: async (email) => {
    return axios.post(`${API_BASE_URL}/users/logout`, null, { params: { email } });
  },

  // Get user details by email
  getUserByEmail: async (email) => {
    return axios.get(`${API_BASE_URL}/users/user`, { params: { email } });
  },

  // Update user details
  updateUser: async (id, updatedUser) => {
    return axios.put(`${API_BASE_URL}/users/update/${id}`, updatedUser);
  },

  // Get all users
  getAllUsers: async () => {
    return axios.get(`${API_BASE_URL}/users/all`);
  },

  // Delete user
  deleteUser: async (id) => {
    return axios.delete(`${API_BASE_URL}/users/${id}`); 
  },

  // Donate a pet
  donatePet: async (petData) => {
    return axios.post(`${API_BASE_URL}/pets/donate`, petData, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  // Add a new project
  addProject: async (formData) => {
    return axios.post(`${API_BASE_URL}/projects/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default userApi;
