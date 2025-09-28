import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API base URL - adjust this for your backend server
// For iOS Simulator: http://localhost:3000/api
// For Android Emulator: http://10.0.2.2:3000/api  
// For Physical Device: use your computer's IP address
const API_BASE_URL = __DEV__ 
  ? Platform.OS === 'android' 
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api'
  : 'https://your-production-api.com/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear stored auth data
      try {
        await AsyncStorage.multiRemove(['token', 'user']);
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // Register user
  register: async (email, password) => {
    const response = await apiClient.post('/auth/register', { email, password });
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await apiClient.post('/auth/verify-token');
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};

// Generic API functions for other endpoints
export const api = {
  // GET request
  get: async (endpoint, params) => {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  },

  // POST request
  post: async (endpoint, data) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },

  // PUT request
  put: async (endpoint, data) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  },

  // DELETE request
  delete: async (endpoint) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
  },
};

export default apiClient;
