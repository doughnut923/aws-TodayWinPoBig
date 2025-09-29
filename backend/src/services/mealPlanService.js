
const { callLLM } = require('./llm');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const MealDatabase = require('../models/MealDatabase');

// Read file synchronously
const basicPrompt = fs.readFileSync('prompt.txt', 'utf8');
// const databasePrompt = fs.readFileSync('database.json', 'utf8');

// // Parse the meal database from databasePrompt (flatten all items from all restaurants)
// let MEAL_DATABASE = [];
// try {
//   const parsed = JSON.parse(databasePrompt);
//   if (parsed && Array.isArray(parsed.restaurants)) {
//     MEAL_DATABASE = parsed.restaurants.flatMap(r =>
//       Array.isArray(r.items)
//         ? r.items.map(item => ({
//             ...item,
//             Restaurant: r.name,
//             RestaurantId: r.restaurant_id,
//             Location: r.location
//           }))
//         : []
//     );
//   } else {
//     MEAL_DATABASE = [];
//   }
// } catch (e) {
//   console.error('Failed to parse database.json:', e);
//   MEAL_DATABASE = [];
// }




/**
 * @param {string} userId
 * @returns {Promise<import('../types/api').GetPlanResponse>}
 */
async function generateMealPlan(userId) {
  // --- MOCK SECTION FOR TESTING FILTERING ---
  // To test filtering, uncomment the following mock data and comment out the real DB fetch above.
  // Example: Simulate two restaurants, one matching location 'TKO', one not.
  /*
  const filteredRestaurants = [
    {
      restaurant_id: 'REST1025',
      name: 'Pasta Palace',
      location: 'TKO',
      items: [
        { id: 'APP101', name: 'Garlic Breadsticks', start_time: 7, end_time: 12 },
        { id: 'PASTA001', name: 'Spaghetti Carbonara', start_time: 11, end_time: 22 }
      ]
    },
    {
      restaurant_id: 'REST9999',
      name: 'Not In Location',
      location: 'Other',
      items: [
        { id: 'OTHER001', name: 'Other Meal', start_time: 8, end_time: 10 }
      ]
    }
  ];
  */
  // Fetch only the required user info from DB
  let user;
  try {
    user = await User.findById(userId, {
      location: 1,
      age: 1,
      height: 1,
      weight: 1,
      unit: 1,
      goal: 1,
      activityLevel: 1,
      targetWeight: 1,
      dietaryRestrictions: 1,
      preferredCuisines: 1,
      mealsPerDay: 1
    }).lean();
  } catch (e) {
    throw new Error('User not found');
  }
  if (!user) {
    throw new Error('User not found');
  }

  // Fetch meal database from MongoDB and filter by user location
  let filteredRestaurants = [];
  try {
    const mealDbDoc = await MealDatabase.findOne({});
    if (mealDbDoc && Array.isArray(mealDbDoc.restaurants)) {
      filteredRestaurants = mealDbDoc.restaurants.filter(r => {
        if (!user.location) return true;
        return r.location && r.location.toLowerCase() === user.location.toLowerCase();
      });
    }
  } catch (e) {
    // fallback: filteredRestaurants stays empty
  }

  // Prepare user info for the prompt
  const userInfo = `User Info:\n` +
    `Location: ${user.location || ''}\n` +
    `Age: ${user.age || ''}\n` +
    `Height: ${user.height || ''} (${user.unit || 'metric'})\n` +
    `Weight: ${user.weight || ''} (${user.unit || 'metric'})\n` +
    `Goal: ${user.goal || ''}\n` +
    `Activity Level: ${user.activityLevel || ''}\n` +
    `Target Weight: ${user.targetWeight || ''}\n` +
    `Dietary Restrictions: ${(user.dietaryRestrictions && user.dietaryRestrictions.length > 0) ? user.dietaryRestrictions.join(', ') : ''}\n` +
    `Preferred Cuisines: ${(user.preferredCuisines && user.preferredCuisines.length > 0) ? user.preferredCuisines.join(', ') : ''}\n` +
    `Meals Per Day: ${user.mealsPerDay || ''}\n`;

  // Sort meals by time slots
  const breakfastMeals = [];
  const lunchMeals = [];
  const dinnerMeals = [];
  filteredRestaurants.forEach(r => {
    if (Array.isArray(r.items)) {
      r.items.forEach(item => {
        // A meal can be in multiple slots if its time overlaps
        if (item.start_time <= 8 && item.end_time >= 11) {
          breakfastMeals.push({ ...item, restaurant: r.name, location: r.location });
        }
        if (item.start_time <= 11 && item.end_time >= 14) {
          lunchMeals.push({ ...item, restaurant: r.name, location: r.location });
        }
        if (item.start_time <= 18 && item.end_time >= 21) {
          dinnerMeals.push({ ...item, restaurant: r.name, location: r.location });
        }
      });
    }
  });

  // Compose sorted meals into a JSON object
  const sortedMealsJson = JSON.stringify({
    breakfast: breakfastMeals,
    lunch: lunchMeals,
    dinner: dinnerMeals
  }, null, 2);

  // Compose a prompt for the LLM using the user info and sorted meals
  const prompt = basicPrompt + '\n' + userInfo + '\n' + sortedMealsJson;
  console.log('Generated Prompt:\n', prompt);
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

  // Helper to find meal by id (Name, id, or Code) in filteredRestaurants
  const findMeal = (id) => {
    if (!id) return undefined;
    const idStr = String(id);
    for (const r of filteredRestaurants) {
      if (Array.isArray(r.items)) {
        const found = r.items.find(m => {
          // Always compare as string for id
          return String(m.id) === idStr;
        });
        if (found) {
          return { ...found, Restaurant: r.name, restaurant: r.name };
        }
      }
    }
    return undefined;
  };

  // Helper to map a meal object to APIMeal format
  const mapToAPIMeal = (meal) => {
    if (!meal) return undefined;
    return {
      Name: meal.name || meal.Name || '',
      Restaurant: meal.Restaurant || meal.restaurant || '',
      Calorie: meal.calories || meal.Calorie || 0,
      Ingredients: meal.ingredients || meal.health_tags || [],
      Price: meal.price || meal.Price || 0,
      Purchase_url: meal.purchase_url || meal.Purchase_url || '',
      Image_url: meal.image || meal.Image_url || meal.image_url || '',
    };
  };

  // Defensive: if plan is undefined or missing keys, fallback to first 3 meals in database
  const emptyMeal = {
    Name: '',
    Restaurant: '',
    Calorie: 0,
    Ingredients: [],
    Price: 0,
    Purchase_url: '',
    Image_url: ''
  };
  const response = {
    morn: mapToAPIMeal(plan && plan.breakfast ? findMeal(plan.breakfast) : null) || emptyMeal,
    afternoon: mapToAPIMeal(plan && plan.lunch ? findMeal(plan.lunch) : null) || emptyMeal,
    dinner: mapToAPIMeal(plan && plan.dinner ? findMeal(plan.dinner) : null) || emptyMeal,
    Alt: Array.isArray(plan.alternatives)
      ? plan.alternatives.map(findMeal).filter(Boolean).map(mapToAPIMeal)
      : []
  };
  // Optionally, you can still include expected_calories, etc. as extra fields if needed by frontend
  if (llmErrorMessage) {
    response.llm_error = llmErrorMessage;
  }
  return response;
}

module.exports = { generateMealPlan }; 