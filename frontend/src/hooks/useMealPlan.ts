import { useState, useEffect, useCallback } from 'react';
import { GetPlanResponse } from '../types';
import { MealPlanAPI, APIError } from '../services';

interface UseMealPlanState {
  data: GetPlanResponse | null;
  formattedData: ReturnType<typeof MealPlanAPI.convertGetPlanResponse> | null;
  loading: boolean;
  error: string | null;
}

interface UseMealPlanReturn extends UseMealPlanState {
  fetchMealPlan: (userID: string) => Promise<void>;
  refetch: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing meal plan data
 * @param userID - Optional user ID to fetch data on mount
 * @returns UseMealPlanReturn - State and functions for meal plan management
 */
export const useMealPlan = (userID?: string): UseMealPlanReturn => {
  const [state, setState] = useState<UseMealPlanState>({
    data: null,
    formattedData: null,
    loading: false,
    error: null,
  });

  const [currentUserID, setCurrentUserID] = useState<string | undefined>(userID);

  const fetchMealPlan = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await MealPlanAPI.getPlan(id);
      const formatted = MealPlanAPI.convertGetPlanResponse(response);
      
      setState(prev => ({
        ...prev,
        data: response,
        formattedData: formatted,
        loading: false,
      }));
      
      setCurrentUserID(id);
    } catch (error: any) {
      let errorMessage = 'Failed to fetch meal plan';
      
      if (error instanceof APIError) {
        if (error.status === 404) {
          errorMessage = 'User not found';
        } else if (error.status === 400) {
          errorMessage = 'Invalid user ID';
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const refetch = useCallback(async () => {
    if (currentUserID) {
      await fetchMealPlan(currentUserID);
    }
  }, [currentUserID, fetchMealPlan]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Fetch on mount if userID is provided
  useEffect(() => {
    if (userID) {
      fetchMealPlan(userID);
    }
  }, [userID, fetchMealPlan]);

  return {
    ...state,
    fetchMealPlan,
    refetch,
    clearError,
  };
};