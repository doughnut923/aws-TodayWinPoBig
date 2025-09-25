const express = require('express');
const { postGetPlan } = require('../controllers/mealPlanController');
const authRoutes = require('./auth');

const appRouter = express.Router();

// Authentication routes
appRouter.use('/auth', authRoutes);

// Existing routes
appRouter.post('/GetPlan', postGetPlan);

module.exports = { appRouter }; 