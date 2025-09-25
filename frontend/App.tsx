import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import './src/devUtils'; // Load development utilities

export default function App(): React.ReactElement {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}

