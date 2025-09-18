import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

// Extended meal data with nutrition info
const getMealDetails = (mealId) => {
  const mealDetails = {
    1: {
      ingredients: ['Whole grain bread', 'Avocado', 'Cherry tomatoes', 'Feta cheese', 'Olive oil', 'Lemon juice', 'Red pepper flakes'],
      nutritionalTags: [
        { name: 'High Fiber', color: '#4CAF50' },
        { name: 'Vitamin E', color: '#FF9800' },
        { name: 'Healthy Fats', color: '#2196F3' },
        { name: 'Heart Healthy', color: '#E91E63' },
      ],
    },
    2: {
      ingredients: ['Grilled chicken breast', 'Mixed greens', 'Cucumber', 'Bell peppers', 'Red onion', 'Olive oil vinaigrette'],
      nutritionalTags: [
        { name: 'High Protein', color: '#FF5722' },
        { name: 'Low Carb', color: '#9C27B0' },
        { name: 'Vitamin C', color: '#FF9800' },
        { name: 'Lean Muscle', color: '#607D8B' },
      ],
    },
    3: {
      ingredients: ['Atlantic salmon', 'Quinoa', 'Steamed broccoli', 'Lemon', 'Herbs', 'Olive oil'],
      nutritionalTags: [
        { name: 'Omega-3', color: '#2196F3' },
        { name: 'Complete Protein', color: '#FF5722' },
        { name: 'Brain Health', color: '#9C27B0' },
        { name: 'Anti-inflammatory', color: '#4CAF50' },
      ],
    },
  };

  return mealDetails[mealId] || {
    ingredients: ['Fresh ingredients', 'Seasonal vegetables', 'Quality proteins'],
    nutritionalTags: [
      { name: 'Nutritious', color: '#4CAF50' },
      { name: 'Fresh', color: '#FF9800' },
    ],
  };
};

export default function MealInfoScreen({ navigation, route }) {
  const { meal } = route.params;
  const mealDetails = getMealDetails(meal.id);

  const handleOrder = () => {
    Alert.alert(
      'Order Meal',
      `Would you like to order ${meal.name} from ${meal.restaurant}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Order Now',
          onPress: () => {
            Alert.alert('Order Placed!', 'Your order has been placed successfully. Estimated delivery: 30-45 minutes.');
          },
        },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.image }} style={styles.mealImage} />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Meal Info */}
        <View style={styles.content}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.restaurant}>{meal.restaurant}</Text>
            <View style={styles.calorieContainer}>
              <Text style={styles.calories}>{meal.calories} calories</Text>
            </View>
          </View>

          {/* Nutritional Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Benefits</Text>
            <View style={styles.tagsContainer}>
              {mealDetails.nutritionalTags.map((tag, index) => (
                <View
                  key={index}
                  style={[styles.tag, { backgroundColor: tag.color }]}
                >
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {mealDetails.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Nutrition Facts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionCard}>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Calories</Text>
                <Text style={styles.nutritionValue}>{meal.calories}</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Protein</Text>
                <Text style={styles.nutritionValue}>25g</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Carbohydrates</Text>
                <Text style={styles.nutritionValue}>35g</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Fat</Text>
                <Text style={styles.nutritionValue}>18g</Text>
              </View>
              <View style={styles.nutritionRow}>
                <Text style={styles.nutritionLabel}>Fiber</Text>
                <Text style={styles.nutritionValue}>8g</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order Now - $12.99</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    padding: 24,
  },
  mealHeader: {
    marginBottom: 32,
  },
  mealName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  restaurant: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  calorieContainer: {
    alignSelf: 'flex-start',
  },
  calories: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  ingredientsContainer: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 12,
    fontWeight: 'bold',
  },
  ingredientText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  nutritionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
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
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});