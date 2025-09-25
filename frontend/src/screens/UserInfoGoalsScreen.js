import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';

const GOALS = [
  {
    id: 'weight_loss',
    title: 'Weight Loss',
    description: 'Lose weight in a healthy way',
    icon: '⚖️',
    color: '#E91E63',
  },
  {
    id: 'muscle_gain',
    title: 'Muscle Gain',
    description: 'Build lean muscle mass',
    icon: '💪',
    color: '#FF5722',
  },
  {
    id: 'healthy_eating',
    title: 'Healthy Eating',
    description: 'Maintain a balanced diet',
    icon: '🥗',
    color: '#4CAF50',
  },
];

export default function UserInfoGoalsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Pre-populate with existing goal if available
    if (user && user.goal) {
      setSelectedGoal(user.goal);
    }
  }, [user]);

  const handleFinish = async () => {
    if (!selectedGoal) {
      Alert.alert('Required', 'Please select your health goal');
      return;
    }

    // Update only the goal since other data is already saved via Redux
    const profileData = {
      goal: selectedGoal // Use frontend goal ID directly (backend now accepts these values)
    };

    try {
      setIsLoading(true);
      console.log('Saving user goal data:', profileData);
      
      // Save profile data to backend via Redux
      const resultAction = await dispatch(updateProfile(profileData));
      
      if (updateProfile.fulfilled.match(resultAction)) {
        console.log('Profile updated successfully:', resultAction.payload);
        // Profile completion will trigger navigation automatically via the RootNavigator
      } else if (updateProfile.rejected.match(resultAction)) {
        console.error('Profile update failed:', resultAction.payload);
        Alert.alert('Error', resultAction.payload || 'Failed to save your information. Please try again.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If this is the first screen, navigate to the logical previous step
      if (!user?.height || !user?.weight) {
        navigation.navigate('UserInfoPhysical');
      } else {
        // User has physical data, so go to physical screen
        navigation.navigate('UserInfoPhysical');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
        </View>
        <Text style={styles.stepText}>Step 4 of 4</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What's your goal?</Text>
        <Text style={styles.subtitle}>
          Choose your primary health objective to get personalized meal recommendations
        </Text>

        <View style={styles.goalsContainer}>
          {GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoal === goal.id && styles.goalCardSelected,
                { borderColor: goal.color }
              ]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <View style={styles.goalHeader}>
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <View style={styles.goalInfo}>
                  <Text style={[styles.goalTitle, { color: goal.color }]}>
                    {goal.title}
                  </Text>
                  <Text style={styles.goalDescription}>
                    {goal.description}
                  </Text>
                </View>
              </View>
              {selectedGoal === goal.id && (
                <View style={[styles.selectedIndicator, { backgroundColor: goal.color }]}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.finishButton,
              (!selectedGoal || isLoading) && styles.finishButtonDisabled
            ]}
            onPress={handleFinish}
            disabled={!selectedGoal || isLoading}
          >
            <Text style={styles.finishButtonText}>
              {isLoading ? 'Saving...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingBottom: 12,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  goalsContainer: {
    gap: 16,
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  goalCardSelected: {
    borderWidth: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    padding: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finishButton: {
    flex: 2,
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
  finishButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});