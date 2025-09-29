const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { env } = require('../config/env');

/**
 * Authentication middleware to protect routes
 */
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token format. Use: Bearer <token>'
      });
    }

    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({
          error: 'Access denied',
          message: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          error: 'Access denied',
          message: 'Account is deactivated'
        });
      }

      req.user = user;
      next();
      
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Access denied',
          message: 'Token has expired'
        });
      }
      
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: 'Access denied',
          message: 'Invalid token'
        });
      }

      throw jwtError;
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Authentication failed'
    });
  }
};

/**
 * Optional authentication middleware - adds user info if token is present, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    // If no auth header, continue without user info
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        req.user = null;
        return next();
      }
      
      req.user = user;
      next();
    } catch (jwtError) {
      // Invalid token, continue without user info
      req.user = null;
      next();
    }
  } catch (error) {
    // Any error, continue without user info
    req.user = null;
    next();
  }
};

/**
 * Generate JWT token for user
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    env.jwtSecret,
    { 
      expiresIn: env.jwtExpire,
      issuer: 'todaywinpobig-api',
      audience: 'todaywinpobig-app'
    }
  );
};

module.exports = {
  auth,
  optionalAuth,
  generateToken
};
