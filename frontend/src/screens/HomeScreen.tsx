import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MealCard from '../components/MealCard';
import { Meal, HomeScreenProps } from '../types';
import { useAuth } from '../navigation/AppNavigator';
import { useMealPlan } from '../hooks';

// Sample meal data - in a real app this would come from an API
// This is now replaced by the meal plan API data

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { userData } = useAuth();
  
  // Generate userID from userData or use fallback
  const userID = userData 
    ? `${userData.firstName}_${userData.lastName}_${userData.age}`.toLowerCase().replace(/\s+/g, '_')
    : null;
  
  // Use the meal plan API hook
  const { 
    formattedData: mealPlanData, 
    loading: mealPlanLoading, 
    error: mealPlanError, 
    fetchMealPlan,
    refetch: refetchMealPlan
  } = useMealPlan();
  
  // State management for checked meals
  const [checkedMeals, setCheckedMeals] = useState<Set<number>>(new Set());
  
  // Animated values
  const progressWidth = useRef(new Animated.Value(0)).current;
  const calorieCount = useRef(new Animated.Value(0)).current;
  const progressOpacity = useRef(new Animated.Value(1)).current;
  
  // Fetch meal plan on component mount or when userID changes
  useEffect(() => {
    if (userID || !userData) { // Fetch even if userID is null (will use mock data)
      fetchMealPlan(userID || 'guest_user');
    }
  }, [userID, fetchMealPlan, userData]);
  
  // Prepare meals from API data
  const featuredMeals: Meal[] = mealPlanData ? [
    mealPlanData.morning,
    mealPlanData.afternoon,
    mealPlanData.dinner
  ] : [];
  
  const alternativeMeals: Meal[] = mealPlanData ? mealPlanData.alternatives : [];
  
  // Calculate daily calorie target based on user data
  const calculateDailyCalorieTarget = (): number => {
    if (!userData) return 2000; // Default fallback
    
    // Basic calorie calculation using Mifflin-St Jeor Equation
    const { age, weight, height, unit, goal } = userData;
    
    // Convert to metric if needed
    let weightKg = weight;
    let heightCm = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightCm = height * 2.54; // inches to cm
    }
    
    // Calculate BMR (assuming average gender factors)
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    
    // Activity multiplier (moderate activity level)
    let tdee = bmr * 1.55;
    
    // Adjust based on goal
    switch (goal) {
      case 'weight_loss':
        return Math.round(tdee - 500); // 500 calorie deficit
      case 'muscle_gain':
        return Math.round(tdee + 300); // 300 calorie surplus
      case 'healthy_eating':
      default:
        return Math.round(tdee); // Maintenance
    }
  };
  
  // Get user data with fallbacks
  const userName: string = userData ? userData.firstName : 'User';
  const dailyCalorieTarget: number = calculateDailyCalorieTarget();
  const baseCalories: number = 0; // Starting calories for the day
  
  // Calculate current calories from checked meals
  const calculateCurrentCalories = (): number => {
    let totalCalories = baseCalories;
    const allMeals = [...featuredMeals, ...alternativeMeals];
    
    checkedMeals.forEach(mealId => {
      const meal = allMeals.find(m => m.id === mealId);
      if (meal) {
        totalCalories += meal.calories;
      }
    });
    
    return totalCalories;
  };

  const [currentCalories, setCurrentCalories] = useState<number>(calculateCurrentCalories());
  const [progress, setProgress] = useState<number>((currentCalories / dailyCalorieTarget) * 100);

  useEffect(() => {
    // Update the current calories when checkedMeals changes
    const newCalories = calculateCurrentCalories();
    if (newCalories !== currentCalories) {
      setCurrentCalories(newCalories);
    }
    const newProgress = (newCalories / dailyCalorieTarget) * 100;
    if (newProgress !== progress) {
      setProgress(newProgress);
    }

    console.log(newCalories);
  }, [checkedMeals]);

  // Animate progress bar and calorie count when calories change
  useEffect(() => {
    // Animate progress bar width
    Animated.timing(progressWidth, {
      toValue: Math.min(progress, 100),
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animate calorie count
    Animated.timing(calorieCount, {
      toValue: currentCalories,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animate progress opacity for visual feedback
    Animated.sequence([
      Animated.timing(progressOpacity, {
        toValue: 0.7,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(progressOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [currentCalories, progress]);

  const handleMealPress = (meal: Meal): void => {
    navigation.navigate('MealInfo', { meal });
  };
  
  const handleCheckboxPress = (meal: Meal): void => {
    setCheckedMeals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(meal.id)) {
        newSet.delete(meal.id);
      } else {
        newSet.add(meal.id);
      }
      return newSet;
    });
  };

  // Format goal title for display
  const formatGoalTitle = (goal: string): string => {
    switch (goal) {
      case 'weight_loss':
        return 'Weight Loss';
      case 'muscle_gain':
        return 'Muscle Gain';
      case 'healthy_eating':
        return 'Healthy Eating';
      default:
        return goal;
    }
  };

  // Format goal description for display
  const formatGoalDescription = (goal: string): string => {
    switch (goal) {
      case 'weight_loss':
        return 'Calorie deficit for healthy weight loss';
      case 'muscle_gain':
        return 'Calorie surplus for muscle building';
      case 'healthy_eating':
        return 'Balanced calories for maintenance';
      default:
        return 'Personalized calorie target';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, {userName}!</Text>
          {userData && (
            <Text style={styles.goalText}>
              Working towards: {formatGoalTitle(userData.goal)}
            </Text>
          )}
        </View>

        {/* Calorie Tracker */}
        <Animated.View style={[styles.calorieSection, { opacity: progressOpacity }]}>
          <View style={styles.calorieCard}>
            <Text style={styles.calorieTitle}>Daily Calorie Goal</Text>
            {userData && (
              <Text style={styles.calorieSubtitle}>
                {formatGoalDescription(userData.goal)}
              </Text>
            )}
            <View style={styles.calorieInfo}>
              <Animated.Text style={styles.calorieNumbers}>
                {Math.round(currentCalories)} / {dailyCalorieTarget} cal
              </Animated.Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <Animated.View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: progressWidth.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                          extrapolate: 'clamp',
                        })
                      }
                    ]} 
                  />
                </View>
                <Animated.Text style={styles.progressText}>
                  {Math.round(progress)}%
                </Animated.Text>
              </View>
              {currentCalories > 0 && (
                <Text style={styles.remainingCalories}>
                  {dailyCalorieTarget - currentCalories > 0 
                    ? `${dailyCalorieTarget - currentCalories} calories remaining`
                    : `${currentCalories - dailyCalorieTarget} calories over goal`}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Featured Meals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Recommendations</Text>
            {mealPlanLoading && <ActivityIndicator size="small" color="#4CAF50" />}
            {mealPlanError && (
              <TouchableOpacity onPress={() => refetchMealPlan()} style={styles.retryButton}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {mealPlanError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load meal plan</Text>
              <Text style={styles.errorSubtext}>Using offline recommendations</Text>
            </View>
          )}
          
          <View style={styles.featuredMeals}>
            {featuredMeals.length > 0 ? featuredMeals.map((meal: Meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onPress={handleMealPress}
                isChecked={checkedMeals.has(meal.id)}
                onCheckboxPress={handleCheckboxPress}
                style={styles.featuredMealCard}
              />
            )) : (
              !mealPlanLoading && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No meal recommendations available</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Alternative Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Options</Text>
          <View style={styles.alternativeMeals}>
            {alternativeMeals.length > 0 ? alternativeMeals.map((meal: Meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onPress={handleMealPress}
                isChecked={checkedMeals.has(meal.id)}
                onCheckboxPress={handleCheckboxPress}
                style={styles.alternativeMealCard}
              />
            )) : (
              !mealPlanLoading && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No alternatives available</Text>
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  goalText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  calorieSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  calorieCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calorieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  calorieSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  calorieInfo: {
    gap: 12,
  },
  calorieNumbers: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  remainingCalories: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    minWidth: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fff3cd',
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  errorText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  errorSubtext: {
    color: '#856404',
    fontSize: 12,
  },
  noDataContainer: {
    padding: 40,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  noDataText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  featuredMeals: {
    gap: 16,
    paddingHorizontal: 24,
  },
  featuredMealCard: {
    marginBottom: 0, // Override MealCard's default margin since we use gap
  },
  alternativeMeals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 16,
  },
  alternativeMealCard: {
    width: '47%',
    marginBottom: 0, // Override MealCard's default margin since we use gap
  },
});

export default HomeScreen;