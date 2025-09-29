const express = require('express');
const { postGetPlan } = require('../controllers/mealPlanController');
const { optionalAuth } = require('../middleware/auth');
const authRoutes = require('./auth');

const appRouter = express.Router();

// Authentication routes
appRouter.use('/auth', authRoutes);

// Meal plan routes (public access, but with optional auth for personalization)
appRouter.post('/GetPlan', optionalAuth, postGetPlan);

module.exports = { appRouter }; 