import { useState, useCallback } from 'react';
import { GetPlanResponse } from '../types';
import { MealPlanAPI } from '../services/mealPlanAPI';

// State interface for the meal plan hook
interface UseMealPlanState {
  data: GetPlanResponse | null;
  formattedData: ReturnType<typeof MealPlanAPI.convertGetPlanResponse> | null;
  loading: boolean;
  error: string | null;
}

// Return type interface for the hook
interface UseMealPlanReturn extends UseMealPlanState {
  fetchMealPlan: (userID: string) => Promise<void>;
  fetchMealPlanWithRetry: (userID: string, onRetry?: (attempt: number) => void) => Promise<void>;
  refetch: () => void;
  clearError: () => void;
}

/**
 * Custom hook for managing meal plan data with API integration
 * Supports both regular fetching and retry logic for empty meal plans
 */
export const useMealPlan = (userID?: string): UseMealPlanReturn => {
  const [state, setState] = useState<UseMealPlanState>({
    data: null,
    formattedData: null,
    loading: false,
    error: null,
  });

  const [lastUserID, setLastUserID] = useState<string>('');

  /**
   * Regular meal plan fetch
   */
  const fetchMealPlan = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    setLastUserID(id);

    try {
      const apiResponse = await MealPlanAPI.getPlan(id);
      const formattedResponse = MealPlanAPI.convertGetPlanResponse(apiResponse);

      setState({
        data: apiResponse,
        formattedData: formattedResponse,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch meal plan',
      }));
    }
  }, []);

  /**
   * Meal plan fetch with retry logic for empty responses
   */
  const fetchMealPlanWithRetry = useCallback(async (
    id: string, 
    onRetry?: (attempt: number) => void
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    setLastUserID(id);

    try {
      const apiResponse = await MealPlanAPI.getPlanWithRetry(id, onRetry);
      const formattedResponse = MealPlanAPI.convertGetPlanResponse(apiResponse);

      setState({
        data: apiResponse,
        formattedData: formattedResponse,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch meal plan after multiple attempts',
      }));
    }
  }, []);

  /**
   * Refetch using the last used userID
   */
  const refetch = useCallback(() => {
    if (lastUserID) {
      fetchMealPlan(lastUserID);
    }
  }, [lastUserID, fetchMealPlan]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    fetchMealPlan,
    fetchMealPlanWithRetry,
    refetch,
    clearError,
  };
};
