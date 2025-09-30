import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL - adjust this for your backend server
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('[API] Request interceptor - token found:', !!token);
      console.log('[API] Request URL:', config.url);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[API] Added Authorization header');
      } else {
        console.log('[API] No token found in AsyncStorage');
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
      
      // You might want to redirect to login screen here
      // or dispatch a logout action
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // Register user
  register: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/register', { email, password });
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData: any) => {
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
  get: async (endpoint: string, params?: any) => {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  },

  // POST request
  post: async (endpoint: string, data?: any) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },

  // PUT request
  put: async (endpoint: string, data?: any) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  },

  // DELETE request
  delete: async (endpoint: string) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
  },
};

export default apiClient;
