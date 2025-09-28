const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'A user with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        height: user.height,
        weight: user.weight,
        unit: user.unit,
        goal: user.goal,
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        createdAt: user.createdAt
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'A user with this email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Registration failed',
      message: 'Unable to create account. Please try again.'
    });
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include password for comparison
    const user = await User.findByEmail(email).select('+password');
    
    if (!user) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data and token
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        height: user.height,
        weight: user.weight,
        unit: user.unit,
        goal: user.goal,
        activityLevel: user.activityLevel,
        dietaryRestrictions: user.dietaryRestrictions || [],
        preferredCuisines: user.preferredCuisines || [],
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        bmi: user.bmi,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'Unable to login. Please try again.'
    });
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        height: user.height,
        weight: user.weight,
        unit: user.unit,
        goal: user.goal,
        activityLevel: user.activityLevel,
        dietaryRestrictions: user.dietaryRestrictions || [],
        preferredCuisines: user.preferredCuisines || [],
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        bmi: user.bmi,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to get profile',
      message: 'Unable to retrieve profile. Please try again.'
    });
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const updates = req.body;

    // Define allowed fields for update
    const allowedFields = [
      'firstName', 'lastName', 'age', 'height', 'weight', 'unit', 'goal',
      'activityLevel', 'targetWeight', 'dietaryRestrictions', 'preferredCuisines', 'mealsPerDay'
    ];

    // Update allowed fields
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        user[field] = updates[field];
      }
    });

    // The profileCompleted will be automatically updated by the pre-save hook
    await user.save();

    const responseUser = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      height: user.height,
      weight: user.weight,
      unit: user.unit,
      goal: user.goal,
      activityLevel: user.activityLevel,
      targetWeight: user.targetWeight,
      dietaryRestrictions: user.dietaryRestrictions || [],
      preferredCuisines: user.preferredCuisines || [],
      mealsPerDay: user.mealsPerDay,
      profileCompleted: user.profileCompleted,
      profileCompletionPercentage: user.profileCompletionPercentage,
      bmi: user.bmi,
      updatedAt: user.updatedAt
    };

    console.log('Profile updated successfully for user:', user.email);
    console.log('Profile completed:', user.profileCompleted);
    console.log('Response user data:', responseUser);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: responseUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Profile update failed',
      message: 'Unable to update profile. Please try again.'
    });
  }
};

/**
 * Verify token
 */
const verifyToken = async (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileCompleted: req.user.profileCompleted
    }
  });
};

/**
 * Logout user
 */
const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      message: 'Unable to logout. Please try again.'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  verifyToken,
  logout
};
