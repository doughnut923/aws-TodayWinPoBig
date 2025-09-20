import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, GestureResponderEvent } from 'react-native';
import { MealCardProps } from '../types';

const MealCard: React.FC<MealCardProps> = ({ 
  meal, 
  onPress, 
  style, 
  isChecked = false, 
  onCheckboxPress 
}) => {
  const checkboxScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const orderedTextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate checkbox scale when checked/unchecked
    Animated.timing(checkboxScale, {
      toValue: isChecked ? 1.2 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animate card opacity when checked/unchecked
    Animated.timing(cardOpacity, {
      toValue: isChecked ? 0.8 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animate ordered text appearance
    Animated.timing(orderedTextOpacity, {
      toValue: isChecked ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isChecked]);

  const handleCheckboxPress = (e: GestureResponderEvent): void => {
    e.stopPropagation(); // Prevent triggering the card press
    onCheckboxPress && onCheckboxPress(meal);
  };

  return (
    <Animated.View style={[{ opacity: cardOpacity }, style]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress && onPress(meal)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={handleCheckboxPress}
            activeOpacity={0.7}
          >
            <Animated.View 
              style={[
                styles.checkbox, 
                isChecked && styles.checkboxChecked,
                { transform: [{ scale: checkboxScale }] }
              ]}
            >
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {meal.type && (
            <Text style={styles.type}>{meal.type}</Text>
          )}
          <Text style={[styles.name, isChecked && styles.nameChecked]} numberOfLines={2}>
            {meal.name}
          </Text>
          <Text style={styles.restaurant} numberOfLines={1}>
            {meal.restaurant}
          </Text>
          <View style={styles.footer}>
            <Text style={[styles.calories, isChecked && styles.caloriesChecked]}>
              {meal.calories} cal
            </Text>
            {meal.price && (
              <Text style={styles.price}>${meal.price}</Text>
            )}
          </View>
          <Animated.View style={{ opacity: orderedTextOpacity }}>
            {isChecked && (
              <Text style={styles.orderedText}>✓ Added to daily calories</Text>
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    gap: 4,
  },
  type: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  nameChecked: {
    color: '#4CAF50',
  },
  restaurant: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
  caloriesChecked: {
    color: '#4CAF50',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default MealCard;