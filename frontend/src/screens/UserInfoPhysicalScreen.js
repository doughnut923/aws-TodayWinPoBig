import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function UserInfoPhysicalScreen({ navigation, route }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const { userData } = route.params;

  const handleNext = () => {
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);
    
    if (!weight.trim()) {
      Alert.alert('Required', 'Please enter your weight');
      return;
    }

    if (!height.trim()) {
      Alert.alert('Required', 'Please enter your height');
      return;
    }

    if (isNaN(weightNumber) || weightNumber <= 0) {
      Alert.alert('Invalid Weight', 'Please enter a valid weight');
      return;
    }

    if (isNaN(heightNumber) || heightNumber <= 0) {
      Alert.alert('Invalid Height', 'Please enter a valid height');
      return;
    }

    // Basic validation ranges
    if (unit === 'metric') {
      if (weightNumber < 30 || weightNumber > 300) {
        Alert.alert('Invalid Weight', 'Please enter a weight between 30-300 kg');
        return;
      }
      if (heightNumber < 100 || heightNumber > 250) {
        Alert.alert('Invalid Height', 'Please enter a height between 100-250 cm');
        return;
      }
    } else {
      if (weightNumber < 65 || weightNumber > 660) {
        Alert.alert('Invalid Weight', 'Please enter a weight between 65-660 lbs');
        return;
      }
      if (heightNumber < 39 || heightNumber > 98) {
        Alert.alert('Invalid Height', 'Please enter a height between 39-98 inches');
        return;
      }
    }

    navigation.navigate('UserInfoGoals', {
      userData: {
        ...userData,
        weight: weightNumber,
        height: heightNumber,
        unit: unit,
      }
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={styles.progressStep} />
          </View>
          <Text style={styles.stepText}>Step 3 of 4</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Physical Information</Text>
          <Text style={styles.subtitle}>
            Help us calculate your daily calorie needs
          </Text>

          <View style={styles.unitSelector}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'metric' && styles.unitButtonActive
              ]}
              onPress={() => setUnit('metric')}
            >
              <Text style={[
                styles.unitButtonText,
                unit === 'metric' && styles.unitButtonTextActive
              ]}>
                Metric
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'imperial' && styles.unitButtonActive
              ]}
              onPress={() => setUnit('imperial')}
            >
              <Text style={[
                styles.unitButtonText,
                unit === 'imperial' && styles.unitButtonTextActive
              ]}>
                Imperial
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

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
                styles.nextButton,
                (!weight.trim() || !height.trim()) && styles.nextButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!weight.trim() || !height.trim()}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardContainer: {
    flex: 1,
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
    justifyContent: 'center',
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
  },
  unitSelector: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    padding: 4,
  },
  unitButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  unitButtonActive: {
    backgroundColor: '#4CAF50',
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  nextButton: {
    flex: 1,
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
  nextButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});