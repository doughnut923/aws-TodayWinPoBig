import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => dispatch(logoutUser() as any) },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No user data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatGoal = (goal: string) => {
    switch (goal) {
      case 'weight_loss':
        return { title: 'Weight Loss', icon: '⚖️', color: '#E91E63' };
      case 'muscle_gain':
        return { title: 'Muscle Gain', icon: '💪', color: '#FF5722' };
      case 'healthy_eating':
        return { title: 'Healthy Eating', icon: '🥗', color: '#4CAF50' };
      default:
        return { title: goal, icon: '🎯', color: '#2196F3' };
    }
  };

  const formatHeight = (height: number, unit: string) => {
    if (unit === 'metric') {
      return `${height} cm`;
    } else {
      const feet = Math.floor(height / 12);
      const inches = height % 12;
      return `${feet}'${inches}"`;
    }
  };

  const formatWeight = (weight: number, unit: string) => {
    return unit === 'metric' ? `${weight} kg` : `${weight} lbs`;
  };

  const goalInfo = formatGoal(user.goal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Your personal information</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.card}>
          <View style={styles.nameSection}>
            <Text style={styles.nameText}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.ageText}>{user.age} years old</Text>
          </View>
        </View>

        {/* Physical Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Physical Information</Text>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Height</Text>
              <Text style={styles.statValue}>
                {formatHeight(user.height, user.unit)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>
                {formatWeight(user.weight, user.unit)}
              </Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Unit System</Text>
              <Text style={styles.statValue}>
                {user.unit === 'metric' ? 'Metric' : 'Imperial'}
              </Text>
            </View>
          </View>
        </View>

        {/* Health Goal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Goal</Text>
          <View style={[styles.goalContainer, { backgroundColor: goalInfo.color + '15' }]}>
            <Text style={styles.goalIcon}>{goalInfo.icon}</Text>
            <View style={styles.goalText}>
              <Text style={[styles.goalTitle, { color: goalInfo.color }]}>
                {goalInfo.title}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => Alert.alert('Coming Soon', 'Edit profile feature will be available soon!')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  ageText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  goalIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  goalText: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E91E63',
  },
  logoutButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default ProfileScreen;