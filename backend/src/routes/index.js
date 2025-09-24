const express = require('express');
const { postGetPlan } = require('../controllers/mealPlanController');

const appRouter = express.Router();

appRouter.post('/GetPlan', postGetPlan);

module.exports = { appRouter }; 