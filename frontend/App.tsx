import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { store } from './src/store/index.js';
import AuthInitializer from './src/components/AuthInitializer';
import AppNavigator from './src/navigation/AppNavigator';
import './src/devUtils'; // Load development utilities

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthInitializer>
    </Provider>
  );
}

