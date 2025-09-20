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
import { MealInfoScreenProps } from '../types';

interface NutritionalTag {
  name: string;
  color: string;
}

interface MealDetails {
  ingredients: string[];
  nutritionalTags: NutritionalTag[];
}

// Extended meal data with nutrition info
const getMealDetails = (mealId: number): MealDetails => {
  const mealDetails: Record<number, MealDetails> = {
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

const MealInfoScreen: React.FC<MealInfoScreenProps> = ({ navigation, route }) => {
  const { meal } = route.params;
  const mealDetails = getMealDetails(meal.id);

  const handleOrder = (): void => {
    Alert.alert(
      'Order Placed!',
      `Your order for ${meal.name} has been placed successfully!`,
      [
        {
          text: 'View Orders',
          onPress: () => {
            // In a real app, navigate to orders screen
            Alert.alert('Coming Soon', 'Orders screen will be available soon!');
          },
        },
        {
          text: 'Continue Shopping',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ]
    );
  };

  const handleAddToCart = (): void => {
    Alert.alert('Added to Cart', `${meal.name} has been added to your cart!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Meal Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            {meal.type && (
              <Text style={styles.type}>{meal.type}</Text>
            )}
            <Text style={styles.name}>{meal.name}</Text>
            <Text style={styles.restaurant}>{meal.restaurant}</Text>
            
            <View style={styles.priceCalorieRow}>
              <View style={styles.calorieContainer}>
                <Text style={styles.calories}>{meal.calories} cal</Text>
              </View>
              {meal.price && (
                <Text style={styles.price}>${meal.price}</Text>
              )}
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
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              A carefully crafted {meal.name.toLowerCase()} featuring fresh, high-quality ingredients. 
              Perfect for maintaining your nutritional goals while enjoying delicious flavors.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleOrder}
        >
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    padding: 24,
    paddingBottom: 100, // Space for action buttons
  },
  header: {
    marginBottom: 32,
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  restaurant: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  priceCalorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieContainer: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  calories: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
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
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  ingredientsContainer: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7f8c8d',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MealInfoScreen;