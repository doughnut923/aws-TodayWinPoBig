import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

interface MealPlanLoadingProps {
  attempt?: number;
  message?: string;
}

const MealPlanLoading: React.FC<MealPlanLoadingProps> = ({ 
  attempt = 1, 
  message = "Tailoring a meal plan for you" 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinning animation for the loading icon
    const spinning = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulsing animation for the dots
    const pulsing = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Fade in animation
    const fadeIn = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    spinning.start();
    pulsing.start();
    fadeIn.start();

    return () => {
      spinning.stop();
      pulsing.stop();
      fadeIn.stop();
    };
  }, [spinValue, pulseValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseOpacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeValue }]}>
      <View style={styles.content}>
        {/* Spinning loading icon */}
        <View style={styles.iconContainer}>
          <Animated.View 
            style={[
              styles.loadingIcon, 
              { transform: [{ rotate: spin }] }
            ]}
          >
            <Text style={styles.iconText}>🍽️</Text>
          </Animated.View>
        </View>

        {/* Loading message */}
        <Text style={styles.title}>{message}</Text>
        
        {/* Animated dots */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: pulseOpacity,
                  transform: [
                    {
                      scale: pulseValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View 
              style={[
                styles.progressBar,
                {
                  width: pulseValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['20%', '80%'],
                  }),
                }
              ]}
            />
          </View>
        </View>

        {/* Attempt indicator */}
        {attempt > 1 && (
          <Text style={styles.attemptText}>
            Attempt {attempt} - Finding the perfect meals for you...
          </Text>
        )}

        {/* Subtle description */}
        <Text style={styles.description}>
          We're crafting a personalized meal plan based on your preferences
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 30,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBackground: {
    height: 4,
    backgroundColor: '#E8F5E8',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  attemptText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MealPlanLoading;
