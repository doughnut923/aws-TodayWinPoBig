import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

// Sample meal data - in a real app this would come from an API
const FEATURED_MEALS = [
  {
    id: 1,
    type: 'Breakfast',
    name: 'Avocado Toast Bowl',
    restaurant: 'Green Kitchen',
    calories: 420,
    image: 'https://via.placeholder.com/150x100/4CAF50/FFFFFF?text=Avocado+Toast',
  },
  {
    id: 2,
    type: 'Lunch',
    name: 'Grilled Chicken Salad',
    restaurant: 'Fresh Bites',
    calories: 380,
    image: 'https://via.placeholder.com/150x100/FF9800/FFFFFF?text=Chicken+Salad',
  },
  {
    id: 3,
    type: 'Dinner',
    name: 'Salmon & Quinoa',
    restaurant: 'Ocean Grill',
    calories: 520,
    image: 'https://via.placeholder.com/150x100/2196F3/FFFFFF?text=Salmon+Quinoa',
  },
];

const ALTERNATIVE_MEALS = [
  {
    id: 4,
    name: 'Greek Yogurt Parfait',
    restaurant: 'Healthy Corner',
    calories: 280,
    image: 'https://via.placeholder.com/120x80/9C27B0/FFFFFF?text=Yogurt',
  },
  {
    id: 5,
    name: 'Veggie Wrap',
    restaurant: 'Green Garden',
    calories: 340,
    image: 'https://via.placeholder.com/120x80/FF5722/FFFFFF?text=Wrap',
  },
  {
    id: 6,
    name: 'Smoothie Bowl',
    restaurant: 'Juice Bar',
    calories: 310,
    image: 'https://via.placeholder.com/120x80/E91E63/FFFFFF?text=Smoothie',
  },
  {
    id: 7,
    name: 'Protein Box',
    restaurant: 'Fit Foods',
    calories: 450,
    image: 'https://via.placeholder.com/120x80/607D8B/FFFFFF?text=Protein',
  },
  {
    id: 8,
    name: 'Buddha Bowl',
    restaurant: 'Zen Kitchen',
    calories: 390,
    image: 'https://via.placeholder.com/120x80/795548/FFFFFF?text=Buddha',
  },
  {
    id: 9,
    name: 'Turkey Sandwich',
    restaurant: 'Deli Fresh',
    calories: 420,
    image: 'https://via.placeholder.com/120x80/FF9800/FFFFFF?text=Sandwich',
  },
];

export default function HomeScreen({ navigation }) {
  // In a real app, this would come from user context/state
  const userName = 'John';
  const dailyCalorieTarget = 2000;
  const currentCalories = 850;
  const progress = (currentCalories / dailyCalorieTarget) * 100;

  const handleMealPress = (meal) => {
    navigation.navigate('MealInfo', { meal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome {userName}!</Text>
        </View>

        {/* Calorie Tracker */}
        <View style={styles.calorieSection}>
          <View style={styles.calorieCard}>
            <Text style={styles.calorieTitle}>Daily Calorie Goal</Text>
            <View style={styles.calorieInfo}>
              <Text style={styles.calorieNumbers}>
                {currentCalories} / {dailyCalorieTarget} cal
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${Math.min(progress, 100)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Featured Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>
          <View style={styles.featuredMeals}>
            {FEATURED_MEALS.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={styles.featuredMealCard}
                onPress={() => handleMealPress(meal)}
              >
                <Image source={{ uri: meal.image }} style={styles.featuredMealImage} />
                <View style={styles.featuredMealInfo}>
                  <Text style={styles.mealType}>{meal.type}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealRestaurant}>{meal.restaurant}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Alternative Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Options</Text>
          <View style={styles.alternativeMeals}>
            {ALTERNATIVE_MEALS.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                style={styles.alternativeMealCard}
                onPress={() => handleMealPress(meal)}
              >
                <Image source={{ uri: meal.image }} style={styles.alternativeMealImage} />
                <View style={styles.alternativeMealInfo}>
                  <Text style={styles.alternativeMealName} numberOfLines={2}>
                    {meal.name}
                  </Text>
                  <Text style={styles.alternativeMealRestaurant} numberOfLines={1}>
                    {meal.restaurant}
                  </Text>
                  <Text style={styles.alternativeMealCalories}>{meal.calories} cal</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  featuredMeals: {
    gap: 16,
    paddingHorizontal: 24,
  },
  featuredMealCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredMealImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  featuredMealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  mealRestaurant: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
  alternativeMeals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 16,
  },
  alternativeMealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  alternativeMealImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  alternativeMealInfo: {
    gap: 4,
  },
  alternativeMealName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  alternativeMealRestaurant: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  alternativeMealCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
});