
const { callLLM } = require('./llm');
const fs = require('fs');
const path = require('path');

// Read file synchronously
const basicPrompt = fs.readFileSync('prompt.txt', 'utf8');
const databasePrompt = fs.readFileSync('database.json', 'utf8');

// Parse the meal database from databasePrompt (flatten all items from all restaurants)
let MEAL_DATABASE = [];
try {
  const parsed = JSON.parse(databasePrompt);
  if (parsed && Array.isArray(parsed.restaurants)) {
    MEAL_DATABASE = parsed.restaurants.flatMap(r =>
      Array.isArray(r.items)
        ? r.items.map(item => ({
            ...item,
            Restaurant: r.name,
            RestaurantId: r.restaurant_id,
            Location: r.location
          }))
        : []
    );
  } else {
    MEAL_DATABASE = [];
  }
} catch (e) {
  console.error('Failed to parse database.json:', e);
  MEAL_DATABASE = [];
}




/**
 * @param {string} userId
 * @returns {Promise<import('../types/api').GetPlanResponse>}
 */
async function generateMealPlan(userId) {
  // Compose a prompt for the LLM using the userId and meal database
  const prompt = basicPrompt + '/n' + databasePrompt;
  let llmResult;
  let llmErrorMessage = '';
  try {
    llmResult = await callLLM(prompt);
  } catch (llmError) {
    // Capture error message for API response
    llmErrorMessage = llmError && llmError.message ? llmError.message : 'LLM call failed';
    llmResult = null;
  }

  // llmResult is already parsed in callLLM, so just use it directly
  const plan = llmResult || {};

  // Helper to find meal by id (Name, id, or Code)
  const findMeal = (id) => {
    if (!id) return undefined;
    // Try to match by id, name, or code (case-insensitive)
    return MEAL_DATABASE.find(m =>
      m.id === id ||
      m.name === id ||
      (m.Code && m.Code === id) ||
      m.Name === id
    );
  };

  // Defensive: if plan is undefined or missing keys, fallback to first 3 meals in database
  const fallbackMeals = MEAL_DATABASE.slice(0, 3);
  const response = {
    morn: plan && plan.breakfast ? findMeal(plan.breakfast) : fallbackMeals[0],
    afternoon: plan && plan.lunch ? findMeal(plan.lunch) : fallbackMeals[1],
    dinner: plan && plan.dinner ? findMeal(plan.dinner) : fallbackMeals[2],
    Alt: Array.isArray(plan.alternatives)
      ? plan.alternatives.map(findMeal).filter(Boolean)
      : fallbackMeals,
    expected_calories: plan && plan.expected_calories ? plan.expected_calories : '',
    expected_protein: plan && plan.expected_protein ? plan.expected_protein : '',
    expected_carbs: plan && plan.expected_carbs ? plan.expected_carbs : ''
  };
  if (llmErrorMessage) {
    response.llm_error = llmErrorMessage;
  }
  return response;
}

module.exports = { generateMealPlan }; 