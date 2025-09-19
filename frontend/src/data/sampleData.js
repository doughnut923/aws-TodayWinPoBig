// Sample meal data for the application
export const MEALS_DATA = [
  {
    id: 1,
    type: 'Breakfast',
    name: 'Avocado Toast Bowl',
    restaurant: 'Green Kitchen',
    calories: 420,
    price: 12.99,
    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Avocado+Toast',
    ingredients: [
      'Whole grain bread',
      'Fresh avocado',
      'Cherry tomatoes',
      'Feta cheese',
      'Extra virgin olive oil',
      'Fresh lemon juice',
      'Red pepper flakes',
      'Sea salt',
    ],
    nutritionalTags: [
      { name: 'High Fiber', color: '#4CAF50' },
      { name: 'Vitamin E', color: '#FF9800' },
      { name: 'Healthy Fats', color: '#2196F3' },
      { name: 'Heart Healthy', color: '#E91E63' },
    ],
    nutrition: {
      protein: 18,
      carbs: 35,
      fat: 28,
      fiber: 12,
      sugar: 8,
    },
    category: 'featured',
  },
  {
    id: 2,
    type: 'Lunch',
    name: 'Grilled Chicken Salad',
    restaurant: 'Fresh Bites',
    calories: 380,
    price: 14.99,
    image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Chicken+Salad',
    ingredients: [
      'Grilled chicken breast',
      'Mixed greens',
      'Cucumber',
      'Bell peppers',
      'Red onion',
      'Cherry tomatoes',
      'Olive oil vinaigrette',
    ],
    nutritionalTags: [
      { name: 'High Protein', color: '#FF5722' },
      { name: 'Low Carb', color: '#9C27B0' },
      { name: 'Vitamin C', color: '#FF9800' },
      { name: 'Lean Muscle', color: '#607D8B' },
    ],
    nutrition: {
      protein: 35,
      carbs: 15,
      fat: 18,
      fiber: 8,
      sugar: 10,
    },
    category: 'featured',
  },
  {
    id: 3,
    type: 'Dinner',
    name: 'Salmon & Quinoa',
    restaurant: 'Ocean Grill',
    calories: 520,
    price: 18.99,
    image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Salmon+Quinoa',
    ingredients: [
      'Atlantic salmon fillet',
      'Organic quinoa',
      'Steamed broccoli',
      'Fresh lemon',
      'Mixed herbs',
      'Olive oil',
      'Garlic',
    ],
    nutritionalTags: [
      { name: 'Omega-3', color: '#2196F3' },
      { name: 'Complete Protein', color: '#FF5722' },
      { name: 'Brain Health', color: '#9C27B0' },
      { name: 'Anti-inflammatory', color: '#4CAF50' },
    ],
    nutrition: {
      protein: 42,
      carbs: 38,
      fat: 22,
      fiber: 6,
      sugar: 4,
    },
    category: 'featured',
  },
  {
    id: 4,
    name: 'Greek Yogurt Parfait',
    restaurant: 'Healthy Corner',
    calories: 280,
    price: 8.99,
    image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Yogurt+Parfait',
    ingredients: [
      'Greek yogurt',
      'Fresh berries',
      'Granola',
      'Honey',
      'Almonds',
    ],
    nutritionalTags: [
      { name: 'Probiotics', color: '#4CAF50' },
      { name: 'Antioxidants', color: '#E91E63' },
    ],
    nutrition: {
      protein: 20,
      carbs: 32,
      fat: 8,
      fiber: 5,
      sugar: 18,
    },
    category: 'alternative',
  },
  {
    id: 5,
    name: 'Veggie Wrap',
    restaurant: 'Green Garden',
    calories: 340,
    price: 10.99,
    image: 'https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Veggie+Wrap',
    ingredients: [
      'Whole wheat tortilla',
      'Hummus',
      'Mixed vegetables',
      'Sprouts',
      'Spinach',
    ],
    nutritionalTags: [
      { name: 'Plant-Based', color: '#4CAF50' },
      { name: 'High Fiber', color: '#FF9800' },
    ],
    nutrition: {
      protein: 12,
      carbs: 48,
      fat: 12,
      fiber: 10,
      sugar: 8,
    },
    category: 'alternative',
  },
  {
    id: 6,
    name: 'Smoothie Bowl',
    restaurant: 'Juice Bar',
    calories: 310,
    price: 11.99,
    image: 'https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Smoothie+Bowl',
    ingredients: [
      'Acai puree',
      'Banana',
      'Berries',
      'Coconut flakes',
      'Chia seeds',
    ],
    nutritionalTags: [
      { name: 'Antioxidants', color: '#E91E63' },
      { name: 'Vitamin C', color: '#FF9800' },
    ],
    nutrition: {
      protein: 8,
      carbs: 58,
      fat: 10,
      fiber: 12,
      sugar: 35,
    },
    category: 'alternative',
  },
];

// User goal types
export const USER_GOALS = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    description: 'Lose weight in a healthy way',
    icon: '⚖️',
    color: '#E91E63',
    calorieModifier: -0.2, // 20% deficit
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain',
    description: 'Build lean muscle mass',
    icon: '💪',
    color: '#FF5722',
    calorieModifier: 0.15, // 15% surplus
  },
  {
    id: 'healthy_eating',
    title: 'Healthy Eating',
    description: 'Maintain a balanced diet',
    icon: '🥗',
    color: '#4CAF50',
    calorieModifier: 0, // Maintenance
  },
];

// Sample user data
export const SAMPLE_USER = {
  firstName: 'John',
  lastName: 'Doe',
  age: 28,
  weight: 75, // kg
  height: 180, // cm
  unit: 'metric',
  goal: 'healthy_eating',
  email: 'john.doe@example.com',
};

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
export const calculateBMR = (user) => {
  const { weight, height, age, gender = 'male' } = user;
  
  // Convert to metric if needed
  let weightKg = weight;
  let heightCm = height;
  
  if (user.unit === 'imperial') {
    weightKg = weight * 0.453592; // lbs to kg
    heightCm = height * 2.54; // inches to cm
  }
  
  // Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  
  return Math.round(bmr);
};

// Calculate daily calorie needs
export const calculateDailyCalories = (user, activityLevel = 1.5) => {
  const bmr = calculateBMR(user);
  const maintenanceCalories = bmr * activityLevel;
  
  const goal = USER_GOALS.find(g => g.id === user.goal);
  const modifier = goal ? goal.calorieModifier : 0;
  
  return Math.round(maintenanceCalories * (1 + modifier));
};

// Get recommended meals based on user goal
export const getRecommendedMeals = (userGoal) => {
  if (userGoal === 'weight_loss') {
    return MEALS_DATA.filter(meal => meal.calories < 400);
  } else if (userGoal === 'muscle_gain') {
    return MEALS_DATA.filter(meal => 
      meal.nutrition && meal.nutrition.protein > 25
    );
  }
  return MEALS_DATA;
};