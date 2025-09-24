const { z } = require('zod');
const { generateMealPlan } = require('../services/mealPlanService');

const getPlanSchema = z.object({
  UserID: z.string().min(1, 'UserID is required'),
});

async function postGetPlan(req, res, next) {
  try {
    const parsed = getPlanSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request body', issues: parsed.error.issues });
    }
    const { UserID } = parsed.data;
    const plan = generateMealPlan(UserID);
    return res.json(plan);
  } catch (error) {
    return next(error);
  }
}

module.exports = { postGetPlan }; 