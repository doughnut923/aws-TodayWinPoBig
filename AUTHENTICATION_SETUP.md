# Authentication System Setup Guide

## Overview
This authentication system uses:
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React Native, Redux Toolkit, Axios, AsyncStorage

## Setup Instructions

### 1. Backend Setup

#### Install MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run MongoDB manually
mongod --config /usr/local/etc/mongod.conf
```

#### Backend Dependencies
All dependencies are already installed. The backend includes:
- `mongoose`: MongoDB object modeling
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token generation
- `express-validator`: Input validation
- `helmet`: Security headers
- `express-rate-limit`: Rate limiting

#### Environment Variables
Update `/backend/.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todaywinpobig
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:19006
```

#### Start Backend Server
```bash
cd backend
npm run dev
```

### 2. Frontend Setup

#### Dependencies Installed
- `@reduxjs/toolkit`: Modern Redux with less boilerplate
- `react-redux`: React bindings for Redux  
- `axios`: HTTP client for API calls

#### API Configuration
The frontend is configured to connect to the backend at `http://localhost:3000/api`.

For React Native testing:
- iOS Simulator: `http://localhost:3000/api`
- Android Emulator: `http://10.0.2.2:3000/api`
- Physical Device: Use your computer's IP address

### 3. API Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user (requires auth)
- `GET /me` - Get current user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)
- `POST /verify-token` - Verify JWT token (requires auth)

#### Request/Response Examples

**Registration:**
```json
// POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "profileCompleted": false,
    "profileCompletionPercentage": 0
  },
  "token": "jwt-token-here"
}
```

**Login:**
```json
// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "profile": {...},
    "preferences": {...},
    "profileCompleted": false
  },
  "token": "jwt-token-here"
}
```

### 4. Redux Store Structure

```javascript
// Auth State
{
  user: User | null,
  token: string | null,
  isLoading: boolean,
  isAuthenticated: boolean,
  error: string | null
}
```

### 5. Key Features

#### Security
- Password hashing with bcrypt (salt rounds: 12)
- JWT tokens with expiration
- Request rate limiting
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet

#### State Management
- Redux Toolkit for clean state management
- Automatic token storage in AsyncStorage
- Token persistence across app restarts
- Automatic token validation on app start

#### API Integration
- Axios interceptors for automatic token attachment
- Error handling for expired tokens
- Automatic token cleanup on logout

### 6. Usage in Components

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser } from '../store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, error } = useSelector(state => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
};
```

### 7. File Structure

```
backend/
├── src/
│   ├── controllers/authController.js
│   ├── middleware/auth.js
│   ├── middleware/validation.js
│   ├── models/User.js
│   ├── routes/auth.js
│   └── services/api.js
├── .env
└── package.json

frontend/
├── src/
│   ├── components/AuthInitializer.js
│   ├── screens/LoginScreenRedux.js
│   ├── screens/SignupScreenRedux.js
│   ├── services/api.js
│   └── store/
│       ├── index.js
│       └── slices/authSlice.js
└── App.tsx
```

### 8. Testing the System

1. Start MongoDB: `brew services start mongodb-community`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Test registration and login functionality
5. Check MongoDB for user data: Use MongoDB Compass or CLI

### 9. Next Steps

- Implement password reset functionality
- Add email verification
- Implement refresh tokens
- Add profile picture upload
- Implement social login (Google, Facebook)
- Add two-factor authentication

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list | grep mongodb`
- Check connection string in `.env`
- Verify MongoDB is accessible: `mongo --eval "db.stats()"`

### Network Issues (React Native)
- Update API_BASE_URL in `frontend/src/services/api.js`
- For Android emulator: Use `http://10.0.2.2:3000/api`
- For physical device: Use your computer's IP address

### Token Issues
- Check JWT_SECRET in backend `.env`
- Clear AsyncStorage if needed
- Verify token expiration settings
