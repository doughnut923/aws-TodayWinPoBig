import { setMockTestMode } from './services/mealPlanAPI';

/**
 * Development utilities for testing meal plan functionality
 * These functions are available in the global scope in development mode
 */

// Make test utilities available globally in development
if (__DEV__) {
  (global as any).testMealPlan = {
    /**
     * Set the mock API to LOADING mode to test retry logic
     */
    setLoadingMode: () => {
      setMockTestMode('LOADING');
      console.log('🔄 Mock API set to LOADING mode - meal plans will return empty');
      console.log('💡 Refresh your app or navigate to trigger retry logic');
    },
    
    /**
     * Set the mock API back to NORMAL mode
     */
    setNormalMode: () => {
      setMockTestMode('NORMAL');
      console.log('✅ Mock API set to NORMAL mode - meal plans will return data');
      console.log('💡 Refresh your app to see normal meal plans');
    },

    /**
     * Show current test mode
     */
    getCurrentMode: () => {
      // This requires exposing the current mode from mockMealPlanAPI
      console.log('Current mock API mode can be checked in the network logs');
    }
  };
  
  console.log('🔧 Development utilities loaded!');
  console.log('📱 Use the following commands in the debugger:');
  console.log('   testMealPlan.setLoadingMode() - Test empty meal plan retry');
  console.log('   testMealPlan.setNormalMode() - Return to normal mode');
}

export {}; // Make this file a module