import { GetPlanRequest, GetPlanResponse, APIMeal, Meal } from '../types';
import { apiRequest, HttpMethod, API_CONFIG } from './apiClient';
import { MockMealPlanAPI } from './mockMealPlanAPI';
import { api } from './api';

// Development mode configuration
const isDevelopmentMode = process.env.NODE_ENV === 'development' || 
                         process.env.EXPO_PUBLIC_DEBUG_MODE === 'true' ||
                         __DEV__;

/**
 * Meal Plan API Service
 * Handles all meal plan related API calls
 */
export class MealPlanAPI {
  
  /**
   * Fetches a personalized meal plan for a user
   * @param userID - The unique identifier for the user
   * @returns Promise<GetPlanResponse> - The meal plan with morning, afternoon, dinner, and alternatives
   */
  static async getPlan(userID: string): Promise<GetPlanResponse> {
    // Use mock API if userID is null/empty
    if (!userID) {
      console.log(`[MealPlanAPI] Using mock API - No UserID provided`);
      return MockMealPlanAPI.getPlan('default-user');
    }

    const requestBody: GetPlanRequest = {
      UserID: userID,
    };

    try {
      console.log(`[MealPlanAPI] Fetching from real API for user: ${userID}`);
      
      // Use our new API service that handles authentication
      const response = await api.post('/GetPlan', requestBody);

      // Validate response structure
      if (!response.morn || !response.afternoon || !response.dinner || !Array.isArray(response.Alt)) {
        throw new Error('Invalid response structure from GetPlan API');
      }

      return response;
    } catch (error: any) {
      console.error('Error fetching meal plan from real API, falling back to mock:', error);
      // Fallback to mock API if real API fails
      return MockMealPlanAPI.getPlan(userID);
    }
  }

  /**
   * Converts API meal format to app meal format
   * @param apiMeal - Meal in API format
   * @param id - Unique ID for the meal (generated client-side)
   * @param type - Optional meal type (breakfast, lunch, dinner)
   * @returns Meal - Meal in app format
   */
  static convertAPIMealToMeal(apiMeal: APIMeal, id: number, type?: string): Meal {
    return {
      id,
      type,
      name: apiMeal.Name,
      restaurant: apiMeal.Restaurant,
      calories: apiMeal.Calorie,
      image: apiMeal.Image_url,
      price: apiMeal.Price,
    };
  }

  /**
   * Converts the full API response to app-friendly format
   * @param apiResponse - Response from GetPlan API
   * @returns Object with converted meals
   */
  static convertGetPlanResponse(apiResponse: GetPlanResponse) {
    let idCounter = 1;

    return {
      morning: this.convertAPIMealToMeal(apiResponse.morn, idCounter++, 'Breakfast'),
      afternoon: this.convertAPIMealToMeal(apiResponse.afternoon, idCounter++, 'Lunch'),
      dinner: this.convertAPIMealToMeal(apiResponse.dinner, idCounter++, 'Dinner'),
      alternatives: apiResponse.Alt.map(meal => 
        this.convertAPIMealToMeal(meal, idCounter++, 'Alternative')
      ),
    };
  }

  /**
   * Helper method to get meal plan with converted format
   * @param userID - The unique identifier for the user
   * @returns Promise with converted meal plan
   */
  static async getPlanFormatted(userID: string) {
    const apiResponse = await this.getPlan(userID);
    return this.convertGetPlanResponse(apiResponse);
  }
}

/**
 * Convenience function for getting meal plan
 * @param userID - The unique identifier for the user
 * @returns Promise<GetPlanResponse> - The meal plan
 */
export const getMealPlan = (userID: string): Promise<GetPlanResponse> => {
  return MealPlanAPI.getPlan(userID);
};

/**
 * Convenience function for getting formatted meal plan
 * @param userID - The unique identifier for the user
 * @returns Promise with converted meal plan
 */
export const getMealPlanFormatted = (userID: string) => {
  return MealPlanAPI.getPlanFormatted(userID);
};

// Export the class as default
export default MealPlanAPI;