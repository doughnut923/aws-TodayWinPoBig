import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UserInfoNameScreen from '../screens/UserInfoNameScreen';
import UserInfoAgeScreen from '../screens/UserInfoAgeScreen';
import UserInfoPhysicalScreen from '../screens/UserInfoPhysicalScreen';
import UserInfoGoalsScreen from '../screens/UserInfoGoalsScreen';
import HomeScreen from '../screens/HomeScreen';
import MealInfoScreen from '../screens/MealInfoScreen';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    </Tab.Navigator>
  );
}

// Auth stack for login/signup flow
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// User info gathering stack
function UserInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserInfoName" component={UserInfoNameScreen} />
      <Stack.Screen name="UserInfoAge" component={UserInfoAgeScreen} />
      <Stack.Screen name="UserInfoPhysical" component={UserInfoPhysicalScreen} />
      <Stack.Screen name="UserInfoGoals" component={UserInfoGoalsScreen} />
    </Stack.Navigator>
  );
}

// Root navigator
function AppContent() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : !hasCompletedOnboarding ? (
          <Stack.Screen name="UserInfo" component={UserInfoStack} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="MealInfo" component={MealInfoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  };

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        login,
        completeOnboarding,
        logout,
      }}
    >
      <AppContent />
    </AuthContext.Provider>
  );
}