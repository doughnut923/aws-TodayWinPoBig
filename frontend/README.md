# Smart Food Delivery Nutrition Tracking App

A React Native mobile application built with Expo that helps users maintain a healthy lifestyle by providing personalized meal recommendations with detailed nutrition information.

## Features

### 🔐 Authentication
- **Login Screen**: Simple email and password authentication
- **Signup Screen**: User registration with email and password validation

### 📝 User Onboarding
- **Name Collection**: Capture user's first and last name
- **Age Input**: Age verification and collection
- **Physical Information**: Weight and height with metric/imperial units
- **Goal Selection**: Choose from weight loss, muscle gain, or healthy eating

### 🏠 Main Application
- **Homepage**: 
  - Personalized welcome message
  - Daily calorie target with progress bar
  - Featured meal recommendations (Breakfast, Lunch, Dinner)
  - Alternative meal options
- **Meal Information Page**:
  - Detailed meal information
  - Restaurant details
  - Calorie count
  - Ingredients list
  - Nutritional tags (Vitamin C, High Protein, etc.)
  - Order functionality

## Tech Stack

- **Framework**: Expo React Native
- **Navigation**: React Navigation (Stack & Tab Navigation)
- **Language**: JavaScript
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet

## Getting Started

### Prerequisites
- Node.js (v14 or newer)
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aws-TodayWinPoBig/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with:
   - **Android**: Expo Go app
   - **iOS**: Camera app (will open in Expo Go)

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── MealCard.js
│   │   └── index.js
│   ├── data/               # Sample data and utilities
│   │   └── sampleData.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   └── screens/           # Application screens
│       ├── LoginScreen.js
│       ├── SignupScreen.js
│       ├── UserInfoNameScreen.js
│       ├── UserInfoAgeScreen.js
│       ├── UserInfoPhysicalScreen.js
│       ├── UserInfoGoalsScreen.js
│       ├── HomeScreen.js
│       └── MealInfoScreen.js
├── assets/                # Static assets
├── App.js                # Main application entry point
└── package.json
```

## Features Overview

### Authentication Flow
1. Users start at the login screen
2. New users can navigate to signup
3. After successful authentication, users proceed to onboarding

### Onboarding Flow
1. **Name**: Collect first and last name
2. **Age**: Age input with validation
3. **Physical Info**: Weight and height with unit selection
4. **Goals**: Choose health objective (weight loss, muscle gain, healthy eating)

### Main App Features
- **Personalized Dashboard**: Welcome message with user's name
- **Calorie Tracking**: Daily goal with visual progress bar
- **Meal Recommendations**: Curated meal suggestions based on user goals
- **Detailed Meal Info**: Comprehensive nutrition and ingredient information
- **Order Integration**: Direct meal ordering functionality

## Sample Data

The app includes comprehensive sample data:
- **Meals**: Various breakfast, lunch, and dinner options
- **Nutrition Info**: Detailed macronutrient breakdown
- **Restaurants**: Sample restaurant partners
- **Tags**: Nutritional benefit tags (High Protein, Vitamin C, etc.)

## Future Enhancements

- Backend API integration
- Real user authentication
- Payment gateway integration
- Push notifications
- Meal tracking and history
- Nutrition analytics
- Social features
- AI-powered meal recommendations

## License

This project is part of the AWS AI Hackathon - Smart Food Delivery Nutrition Tracking System.