import { GetPlanResponse, APIMeal } from '../types';

// Test mode configuration - set to 'LOADING' to simulate empty responses
export type MockTestMode = 'NORMAL' | 'LOADING';
export let currentTestMode: MockTestMode = 'NORMAL';

export const setMockTestMode = (mode: MockTestMode): void => {
  currentTestMode = mode;
  console.log(`[MockAPI] Test mode set to: ${mode}`);
};

// Mock meal data that matches the API response format
const MOCK_API_MEALS: APIMeal[] = [
  {
    Name: "Avocado Toast Bowl",
    Restaurant: "Green Kitchen",
    Calorie: 420,
    Ingredients: ["avocado", "whole grain bread", "cherry tomatoes", "olive oil", "sea salt"],
    Price: 12,
    Purchase_url: "https://example.com/order/avocado-toast",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Grilled Chicken Salad",
    Restaurant: "Fresh Bites",
    Calorie: 380,
    Ingredients: ["grilled chicken breast", "mixed greens", "cucumber", "bell peppers", "balsamic vinaigrette"],
    Price: 15,
    Purchase_url: "https://example.com/order/chicken-salad",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Salmon & Quinoa",
    Restaurant: "Ocean Grill",
    Calorie: 520,
    Ingredients: ["grilled salmon", "quinoa", "steamed broccoli", "lemon", "herbs"],
    Price: 22,
    Purchase_url: "https://example.com/order/salmon-quinoa",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Greek Yogurt Parfait",
    Restaurant: "Healthy Corner",
    Calorie: 280,
    Ingredients: ["greek yogurt", "granola", "fresh berries", "honey", "almonds"],
    Price: 8,
    Purchase_url: "https://example.com/order/yogurt-parfait",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Veggie Wrap",
    Restaurant: "Green Garden",
    Calorie: 340,
    Ingredients: ["whole wheat tortilla", "hummus", "cucumber", "carrots", "sprouts", "bell peppers"],
    Price: 10,
    Purchase_url: "https://example.com/order/veggie-wrap",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Smoothie Bowl",
    Restaurant: "Juice Bar",
    Calorie: 310,
    Ingredients: ["acai", "banana", "berries", "coconut flakes", "chia seeds"],
    Price: 11,
    Purchase_url: "https://example.com/order/smoothie-bowl",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Protein Box",
    Restaurant: "Fit Foods",
    Calorie: 450,
    Ingredients: ["grilled chicken", "hard boiled eggs", "nuts", "cheese", "apple slices"],
    Price: 16,
    Purchase_url: "https://example.com/order/protein-box",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Buddha Bowl",
    Restaurant: "Zen Kitchen",
    Calorie: 390,
    Ingredients: ["quinoa", "roasted vegetables", "chickpeas", "avocado", "tahini dressing"],
    Price: 14,
    Purchase_url: "https://example.com/order/buddha-bowl",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Turkey Sandwich",
    Restaurant: "Deli Fresh",
    Calorie: 420,
    Ingredients: ["whole grain bread", "sliced turkey", "lettuce", "tomato", "mustard"],
    Price: 9,
    Purchase_url: "https://example.com/order/turkey-sandwich",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Overnight Oats",
    Restaurant: "Morning Glory",
    Calorie: 320,
    Ingredients: ["rolled oats", "almond milk", "chia seeds", "banana", "maple syrup"],
    Price: 7,
    Purchase_url: "https://example.com/order/overnight-oats",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Mediterranean Bowl",
    Restaurant: "Olive Branch",
    Calorie: 460,
    Ingredients: ["quinoa", "falafel", "cucumber", "tomato", "olives", "tzatziki"],
    Price: 17,
    Purchase_url: "https://example.com/order/mediterranean-bowl",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    Name: "Green Smoothie",
    Restaurant: "Juice Bar",
    Calorie: 180,
    Ingredients: ["spinach", "banana", "apple", "ginger", "coconut water"],
    Price: 6,
    Purchase_url: "https://example.com/order/green-smoothie",
    Image_url: "https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Empty meal objects for LOADING mode testing
const EMPTY_MEAL: APIMeal = {
  Name: "",
  Restaurant: "",
  Calorie: 0,
  Ingredients: [],
  Price: 0,
  Purchase_url: "",
  Image_url: ""
};

/**
 * Mock Meal Plan API for development and testing
 */
export class MockMealPlanAPI {
  
  /**
   * Simulates API delay for realistic testing
   */
  private static async simulateDelay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get a random meal from the mock data
   */
  private static getRandomMeal(): APIMeal {
    const randomIndex = Math.floor(Math.random() * MOCK_API_MEALS.length);
    return MOCK_API_MEALS[randomIndex];
  }

  /**
   * Get multiple random meals (avoiding duplicates)
   */
  private static getRandomMeals(count: number): APIMeal[] {
    const shuffled = [...MOCK_API_MEALS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, MOCK_API_MEALS.length));
  }

  /**
   * Mock implementation of getPlan endpoint
   */
  static async getPlan(userID: string): Promise<GetPlanResponse> {
    console.log(`[MockAPI] Fetching meal plan for user: ${userID}, mode: ${currentTestMode}`);
    
    // Simulate API delay
    await this.simulateDelay();

    // In LOADING mode, return empty meals to simulate the server not ready
    if (currentTestMode === 'LOADING') {
      console.log(`[MockAPI] Returning empty meal plan (LOADING mode)`);
      return {
        morn: EMPTY_MEAL,
        afternoon: EMPTY_MEAL,
        dinner: EMPTY_MEAL,
        Alt: []
      };
    }

    // Simulate occasional errors for testing (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Mock API: Simulated network error');
    }

    // Generate a consistent but varied meal plan based on userID
    let seed = userID.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Use seeded random to get consistent results for the same userID
    const shuffled = [...MOCK_API_MEALS].sort(() => 0.5 - seededRandom());
    const alternatives = [...MOCK_API_MEALS].sort(() => 0.5 - seededRandom()).slice(0, 6);

    const response: GetPlanResponse = {
      morn: shuffled[0] || MOCK_API_MEALS[0],
      afternoon: shuffled[1] || MOCK_API_MEALS[1], 
      dinner: shuffled[2] || MOCK_API_MEALS[2],
      Alt: alternatives
    };

    console.log(`[MockAPI] Generated meal plan:`, {
      morning: response.morn.Name,
      afternoon: response.afternoon.Name,
      dinner: response.dinner.Name,
      alternatives: response.Alt.length
    });

    return response;
  }

  /**
   * Mock specific meal recommendations based on user preferences
   */
  static async getPersonalizedPlan(userID: string, preferences?: {
    goal?: 'weight_loss' | 'muscle_gain' | 'healthy_eating';
    calorieTarget?: number;
  }): Promise<GetPlanResponse> {
    console.log(`[MockAPI] Fetching personalized meal plan for user: ${userID}`, preferences);
    
    await this.simulateDelay(1000); // Longer delay for "personalized" processing

    let filteredMeals = [...MOCK_API_MEALS];

    // Filter based on calorie goals
    if (preferences?.goal) {
      switch (preferences.goal) {
        case 'weight_loss':
          filteredMeals = MOCK_API_MEALS.filter(meal => meal.Calorie <= 400);
          break;
        case 'muscle_gain':
          filteredMeals = MOCK_API_MEALS.filter(meal => meal.Calorie >= 350);
          break;
        case 'healthy_eating':
        default:
          // Use all meals for balanced approach
          break;
      }
    }

    const shuffled = [...filteredMeals].sort(() => 0.5 - Math.random());
    const alternatives = [...MOCK_API_MEALS].sort(() => 0.5 - Math.random()).slice(0, 6);

    return {
      morn: shuffled[0] || MOCK_API_MEALS[0],
      afternoon: shuffled[1] || MOCK_API_MEALS[1],
      dinner: shuffled[2] || MOCK_API_MEALS[2],
      Alt: alternatives
    };
  }
}

// Export mock meals for other components that might need them
export { MOCK_API_MEALS };
export default MockMealPlanAPI;
