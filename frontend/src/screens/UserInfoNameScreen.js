import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';

export default function UserInfoNameScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Pre-populate with existing data if available
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const handleNext = async () => {
    if (!firstName.trim()) {
      Alert.alert('Required', 'Please enter your first name');
      return;
    }

    if (!lastName.trim()) {
      Alert.alert('Required', 'Please enter your last name');
      return;
    }

    try {
      // Update user profile with Redux
      const profileData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      
      console.log('Updating profile with name data:', profileData);
      const resultAction = await dispatch(updateProfile(profileData));
      
      if (updateProfile.fulfilled.match(resultAction)) {
        navigation.navigate('UserInfoAge');
      } else {
        Alert.alert('Error', 'Failed to save profile information');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to save profile information');
    }
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
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
          </View>
          <Text style={styles.stepText}>Step 1 of 5</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.subtitle}>
            Help us personalize your experience
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!firstName.trim() || !lastName.trim()) && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={!firstName.trim() || !lastName.trim()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
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
  nextButton: {
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