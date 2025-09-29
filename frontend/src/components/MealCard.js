import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function MealCard({ meal, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress && onPress(meal)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: meal.image }} style={styles.image} />
      <View style={styles.content}>
        {meal.type && (
          <Text style={styles.type}>{meal.type}</Text>
        )}
        <Text style={styles.name} numberOfLines={2}>
          {meal.name}
        </Text>
        <Text style={styles.restaurant} numberOfLines={1}>
          {meal.restaurant}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.calories}>{meal.calories} cal</Text>
          {meal.price && (
            <Text style={styles.price}>${meal.price}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
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
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});