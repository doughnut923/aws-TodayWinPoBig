import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import MealInfoScreen from '../screens/MealInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import UserInfoNameScreen from '../screens/UserInfoNameScreen';
import UserInfoAgeScreen from '../screens/UserInfoAgeScreen';
import UserInfoPhysicalScreen from '../screens/UserInfoPhysicalScreen';
import UserInfoGoalsScreen from '../screens/UserInfoGoalsScreen';
import { RootStackParamList, TabParamList, AuthContextType, UserInfoStackParamList, AuthStackParamList, User } from '../types';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const UserInfoStackNavigator = createStackNavigator<UserInfoStackParamList>();
const AuthStackNavigator = createStackNavigator<AuthStackParamList>();

// Placeholder component for missing screen (Orders only)
const OrdersScreen: React.FC = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderTitle}>Orders</Text>
    <Text style={styles.placeholderText}>Orders screen coming soon!</Text>
  </View>
);

// Main app tabs after login/registration flow
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
}

// User information collection stack
function UserInfoStack() {
  return (
    <UserInfoStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserInfoStackNavigator.Screen name="UserInfoName" component={UserInfoNameScreen} />
      <UserInfoStackNavigator.Screen name="UserInfoAge" component={UserInfoAgeScreen} />
      <UserInfoStackNavigator.Screen name="UserInfoPhysical" component={UserInfoPhysicalScreen} />
      <UserInfoStackNavigator.Screen name="UserInfoGoals" component={UserInfoGoalsScreen} />
    </UserInfoStackNavigator.Navigator>
  );
}

// Auth stack for login/signup
function AuthStack() {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="Signup" component={SignupScreen} />
    </AuthStackNavigator.Navigator>
  );
}

// Root navigator
function RootNavigator() {
  const { isLoggedIn, hasCompletedOnboarding } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : !hasCompletedOnboarding ? (
        <Stack.Screen name="UserInfoFlow" component={UserInfoStack} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="MealInfo" component={MealInfoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userData, setUserData] = useState<User | undefined>(undefined);

  const login = (): void => {
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    setHasCompletedOnboarding(false);
    setUserEmail('');
    setUserData(undefined);
  };

  const completeOnboarding = (data: User): void => {
    setUserData(data);
    setHasCompletedOnboarding(true);
  };

  const value: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    userEmail,
    setUserEmail,
    userData,
    setUserData,
    login,
    logout,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Main App Navigator Component
export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Styles for placeholder screens
const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});