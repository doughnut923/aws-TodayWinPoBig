/** @typedef {import('../types/api')} types */

/** @type {import('../types/api').APIMeal[]} */
const MOCK_MEALS = [
  {
    Name: 'Avocado Toast Bowl',
    Restaurant: 'Green Kitchen',
    Calorie: 420,
    Ingredients: ['avocado', 'whole grain bread', 'cherry tomatoes', 'olive oil', 'sea salt'],
    Price: 12,
    Purchase_url: 'https://example.com/order/avocado-toast',
    Image_url: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Avocado+Toast',
  },
  {
    Name: 'Grilled Chicken Salad',
    Restaurant: 'Fresh Bites',
    Calorie: 380,
    Ingredients: ['grilled chicken breast', 'mixed greens', 'cucumber', 'bell peppers', 'balsamic vinaigrette'],
    Price: 15,
    Purchase_url: 'https://example.com/order/chicken-salad',
    Image_url: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Chicken+Salad',
  },
  {
    Name: 'Salmon & Quinoa',
    Restaurant: 'Ocean Grill',
    Calorie: 520,
    Ingredients: ['grilled salmon', 'quinoa', 'steamed broccoli', 'lemon', 'herbs'],
    Price: 22,
    Purchase_url: 'https://example.com/order/salmon-quinoa',
    Image_url: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Salmon+Quinoa',
  },
  {
    Name: 'Greek Yogurt Parfait',
    Restaurant: 'Healthy Corner',
    Calorie: 280,
    Ingredients: ['greek yogurt', 'granola', 'fresh berries', 'honey', 'almonds'],
    Price: 8,
    Purchase_url: 'https://example.com/order/yogurt-parfait',
    Image_url: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Yogurt+Parfait',
  },
  {
    Name: 'Veggie Wrap',
    Restaurant: 'Green Garden',
    Calorie: 340,
    Ingredients: ['whole wheat tortilla', 'hummus', 'cucumber', 'carrots', 'sprouts', 'bell peppers'],
    Price: 10,
    Purchase_url: 'https://example.com/order/veggie-wrap',
    Image_url: 'https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Veggie+Wrap',
  },
  {
    Name: 'Smoothie Bowl',
    Restaurant: 'Juice Bar',
    Calorie: 310,
    Ingredients: ['acai', 'banana', 'berries', 'coconut flakes', 'chia seeds'],
    Price: 11,
    Purchase_url: 'https://example.com/order/smoothie-bowl',
    Image_url: 'https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Smoothie+Bowl',
  },
];

function seededShuffle(array, seed) {
  let currentSeed = seed;
  const random = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
  return [...array].sort(() => 0.5 - random());
}

/**
 * @param {string} userId
 * @returns {import('../types/api').GetPlanResponse}
 */
function generateMealPlan(userId) {
  const seed = userId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) || 42;
  const shuffled = seededShuffle(MOCK_MEALS, seed);
  const alternatives = seededShuffle(MOCK_MEALS, seed + 7).slice(0, Math.min(6, MOCK_MEALS.length));

  return {
    morn: shuffled[0] || MOCK_MEALS[0],
    afternoon: shuffled[1] || MOCK_MEALS[1],
    dinner: shuffled[2] || MOCK_MEALS[2],
    Alt: alternatives,
  };
}

module.exports = { generateMealPlan }; 