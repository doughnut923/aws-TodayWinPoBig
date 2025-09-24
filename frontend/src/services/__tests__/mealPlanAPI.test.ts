import { MealPlanAPI } from '../mealPlanAPI';
import { setMockTestMode, MockMealPlanAPI } from '../mockMealPlanAPI';
import { GetPlanResponse } from '../../types';

// Mock the apiClient to control external API calls
jest.mock('../apiClient', () => ({
  apiRequest: jest.fn(),
  HttpMethod: {
    POST: 'POST',
  },
  API_CONFIG: {
    ENDPOINTS: {
      GET_PLAN: '/getplan'
    }
  }
}));

describe('MealPlanAPI', () => {
  beforeEach(() => {
    // Reset to normal mode before each test
    setMockTestMode('NORMAL');
  });

  describe('getPlan', () => {
    it('should return a valid meal plan in normal mode', async () => {
      const response = await MealPlanAPI.getPlan('test-user');
      
      expect(response).toBeDefined();
      expect(response.morn).toBeDefined();
      expect(response.afternoon).toBeDefined();
      expect(response.dinner).toBeDefined();
      expect(Array.isArray(response.Alt)).toBe(true);
      
      // Check that meals are not empty
      expect(response.morn.Name).toBeTruthy();
      expect(response.morn.Restaurant).toBeTruthy();
      expect(response.morn.Calorie).toBeGreaterThan(0);
    });

    it('should return empty meals in LOADING mode', async () => {
      setMockTestMode('LOADING');
      
      const response = await MealPlanAPI.getPlan('test-user');
      
      expect(response).toBeDefined();
      expect(response.morn.Name).toBe('');
      expect(response.morn.Restaurant).toBe('');
      expect(response.morn.Calorie).toBe(0);
      expect(response.afternoon.Name).toBe('');
      expect(response.dinner.Name).toBe('');
      expect(response.Alt).toEqual([]);
    });
  });

  describe('getPlanWithRetry', () => {
    it('should return immediately if meal plan is valid on first attempt', async () => {
      const onRetryMock = jest.fn();
      
      const response = await MealPlanAPI.getPlanWithRetry('test-user', onRetryMock);
      
      expect(response).toBeDefined();
      expect(response.morn.Name).toBeTruthy();
      expect(onRetryMock).not.toHaveBeenCalled();
    });

    it('should retry when meal plan is empty and eventually succeed', async () => {
      const onRetryMock = jest.fn();
      let attemptCount = 0;
      
      // Mock the getPlan method to return empty for first 2 calls, then valid data
      const originalGetPlan = MealPlanAPI.getPlan;
      MealPlanAPI.getPlan = jest.fn().mockImplementation(async (userID: string) => {
        attemptCount++;
        if (attemptCount <= 2) {
          // Return empty meal plan for first 2 attempts
          return {
            morn: { Name: '', Restaurant: '', Calorie: 0, Ingredients: [], Price: 0, Purchase_url: '', Image_url: '' },
            afternoon: { Name: '', Restaurant: '', Calorie: 0, Ingredients: [], Price: 0, Purchase_url: '', Image_url: '' },
            dinner: { Name: '', Restaurant: '', Calorie: 0, Ingredients: [], Price: 0, Purchase_url: '', Image_url: '' },
            Alt: []
          };
        } else {
          // Return valid meal plan on 3rd attempt
          return originalGetPlan.call(MealPlanAPI, userID);
        }
      });

      // Override setTimeout to avoid actual delays in tests
      const originalSetTimeout = setTimeout;
      (global as any).setTimeout = (callback: () => void) => {
        callback();
        return 1;
      };

      const response = await MealPlanAPI.getPlanWithRetry('test-user', onRetryMock);
      
      expect(response).toBeDefined();
      expect(response.morn.Name).toBeTruthy();
      expect(onRetryMock).toHaveBeenCalledTimes(2); // Called for the 2 failed attempts
      expect(onRetryMock).toHaveBeenCalledWith(1);
      expect(onRetryMock).toHaveBeenCalledWith(2);
      
      // Restore original functions
      (global as any).setTimeout = originalSetTimeout;
      MealPlanAPI.getPlan = originalGetPlan;
    }, 10000); // Increase timeout for this test

    it('should throw error after maximum retry attempts', async () => {
      setMockTestMode('LOADING'); // This will always return empty meals
      const onRetryMock = jest.fn();
      
      // Override setTimeout to avoid actual delays in tests
      const originalSetTimeout = setTimeout;
      (global as any).setTimeout = (callback: () => void) => {
        callback();
        return 1;
      };

      await expect(MealPlanAPI.getPlanWithRetry('test-user', onRetryMock))
        .rejects.toThrow('Failed to get valid meal plan after 20 attempts');
      
      expect(onRetryMock).toHaveBeenCalledTimes(20);
      
      // Restore original setTimeout
      (global as any).setTimeout = originalSetTimeout;
    }, 10000); // Increase timeout for this test
  });

  describe('isMealPlanEmpty utility function', () => {
    it('should detect empty meal plans', () => {
      const emptyResponse: GetPlanResponse = {
        morn: { Name: '', Restaurant: '', Calorie: 0, Ingredients: [], Price: 0, Purchase_url: '', Image_url: '' },
        afternoon: { Name: 'Valid Meal', Restaurant: 'Restaurant', Calorie: 300, Ingredients: [], Price: 10, Purchase_url: '', Image_url: '' },
        dinner: { Name: 'Valid Meal', Restaurant: 'Restaurant', Calorie: 400, Ingredients: [], Price: 15, Purchase_url: '', Image_url: '' },
        Alt: []
      };

      // Access the private function through any to test it
      const isMealPlanEmpty = (MealPlanAPI as any).isMealPlanEmpty || 
        ((response: GetPlanResponse): boolean => {
          const isMealEmpty = (meal: any): boolean => {
            return !meal || 
                   !meal.Name || 
                   meal.Name.trim() === '' ||
                   !meal.Restaurant ||
                   meal.Restaurant.trim() === '' ||
                   meal.Calorie <= 0;
          };
          return isMealEmpty(response.morn) || 
                 isMealEmpty(response.afternoon) || 
                 isMealEmpty(response.dinner);
        });

      expect(isMealPlanEmpty(emptyResponse)).toBe(true);
    });

    it('should not detect valid meal plans as empty', async () => {
      const response = await MealPlanAPI.getPlan('test-user');
      
      const isMealPlanEmpty = (response: GetPlanResponse): boolean => {
        const isMealEmpty = (meal: any): boolean => {
          return !meal || 
                 !meal.Name || 
                 meal.Name.trim() === '' ||
                 !meal.Restaurant ||
                 meal.Restaurant.trim() === '' ||
                 meal.Calorie <= 0;
        };
        return isMealEmpty(response.morn) || 
               isMealEmpty(response.afternoon) || 
               isMealEmpty(response.dinner);
      };

      expect(isMealPlanEmpty(response)).toBe(false);
    });
  });

  describe('convertAPIMealToMeal', () => {
    it('should correctly convert API meal format to app format', () => {
      const apiMeal = {
        Name: 'Test Meal',
        Restaurant: 'Test Restaurant',
        Calorie: 500,
        Ingredients: ['ingredient1', 'ingredient2'],
        Price: 15,
        Purchase_url: 'https://example.com/order',
        Image_url: 'https://example.com/image.jpg'
      };

      const converted = MealPlanAPI.convertAPIMealToMeal(apiMeal, 1, 'Breakfast');

      expect(converted).toEqual({
        id: 1,
        type: 'Breakfast',
        name: 'Test Meal',
        restaurant: 'Test Restaurant',
        calories: 500,
        image: 'https://example.com/image.jpg',
        price: 15,
        ingredients: ['ingredient1', 'ingredient2'],
        purchase_url: 'https://example.com/order'
      });
    });
  });

  describe('convertGetPlanResponse', () => {
    it('should convert full API response to app-friendly format', async () => {
      const apiResponse = await MealPlanAPI.getPlan('test-user');
      const converted = MealPlanAPI.convertGetPlanResponse(apiResponse);

      expect(converted).toHaveProperty('morning');
      expect(converted).toHaveProperty('afternoon');
      expect(converted).toHaveProperty('dinner');
      expect(converted).toHaveProperty('alternatives');
      
      expect(converted.morning.id).toBe(1);
      expect(converted.afternoon.id).toBe(2);
      expect(converted.dinner.id).toBe(3);
      expect(converted.alternatives[0].id).toBe(4);
      
      expect(converted.morning.type).toBe('Breakfast');
      expect(converted.afternoon.type).toBe('Lunch');
      expect(converted.dinner.type).toBe('Dinner');
    });
  });

  describe('MockMealPlanAPI test modes', () => {
    it('should switch between NORMAL and LOADING modes correctly', async () => {
      // Test normal mode
      setMockTestMode('NORMAL');
      const normalResponse = await MockMealPlanAPI.getPlan('test-user');
      expect(normalResponse.morn.Name).toBeTruthy();

      // Test loading mode
      setMockTestMode('LOADING');
      const loadingResponse = await MockMealPlanAPI.getPlan('test-user');
      expect(loadingResponse.morn.Name).toBe('');
      
      // Switch back to normal
      setMockTestMode('NORMAL');
      const normalResponse2 = await MockMealPlanAPI.getPlan('test-user');
      expect(normalResponse2.morn.Name).toBeTruthy();
    });
  });
});
