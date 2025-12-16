import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  changePassword: (data) => api.post('/auth/change-password', data),
};

// Student API calls
export const studentAPI = {
  getAll: () => api.get('/students'),
  getProfile: (id) => api.get(`/students/profile/${id || ''}`),
  create: (studentData) => api.post('/students', studentData),
  update: (id, studentData) => api.put(`/students/profile/${id || ''}`, studentData),
  delete: (id) => api.delete(`/students/${id}`),
};

export default api;