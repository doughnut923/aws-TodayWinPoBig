import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../../services/api';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

console.log('=== AUTH SLICE INITIALIZED ===');
console.log('Initial state:', initialState);

// Async thunks for authentication actions
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      
      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      
      console.log('Login successful, stored user:', response.user);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(email, password);
      
      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      console.log('=== LOADING STORED AUTH ===');
      
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      
      console.log('Found stored token:', !!token);
      console.log('Found stored user:', !!userStr);
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        
        console.log('Stored user data:', user);
        console.log('User has _id:', !!user._id);
        console.log('User has email:', !!user.email);
        
        // Check if user data is incomplete or corrupted
        if (!user._id || !user.email) {
          console.log('Incomplete user data detected, clearing stored auth');
          await AsyncStorage.multiRemove(['token', 'user']);
          return rejectWithValue('Incomplete user data, please login again');
        }
        
        // Verify token is still valid
        try {
          await authAPI.verifyToken();
          return { token, user };
        } catch (error) {
          // Token is invalid, clear storage
          await AsyncStorage.multiRemove(['token', 'user']);
          return rejectWithValue('Token expired');
        }
      }
      
      return rejectWithValue('No stored auth found');
    } catch (error) {
      return rejectWithValue('Failed to load stored authentication');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      
      // Update stored user data
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      
      console.log('Profile updated, stored user:', response.user);
      
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      
      // Clear stored data
      await AsyncStorage.multiRemove(['token', 'user']);
      
      return null;
    } catch (error) {
      // Even if logout fails on server, clear local data
      await AsyncStorage.multiRemove(['token', 'user']);
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.multiRemove(['token', 'user']);
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('=== LOGIN SUCCESS ===');
        console.log('Action payload:', action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        console.log('New auth state:', { isAuthenticated: state.isAuthenticated, user: state.user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('=== REGISTER SUCCESS ===');
        console.log('Action payload:', action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        console.log('New auth state:', { isAuthenticated: state.isAuthenticated, user: state.user });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Load stored auth
    builder
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        console.log('=== LOAD STORED AUTH SUCCESS ===');
        console.log('Action payload:', action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        console.log('New auth state:', { isAuthenticated: state.isAuthenticated, user: state.user });
      })
      .addCase(loadStoredAuth.rejected, (state, action) => {
        console.log('=== LOAD STORED AUTH REJECTED ===');
        console.log('Rejection reason:', action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        console.log('Auth state after rejection:', { isAuthenticated: state.isAuthenticated, user: state.user });
      });

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
