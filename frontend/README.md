# 🍽️ TodayWinPoBig - Smart Food Delivery & Nutrition Tracking App

A modern React Native mobile application built with Expo and TypeScript that revolutionizes meal planning through personalized nutrition tracking, AI-powered meal recommendations, and seamless food delivery integration.

## 🌟 Features

### 🔐 Authentication & User Management
- **Secure Login/Signup**: Email and password authentication with validation
- **Comprehensive Onboarding**: Multi-step user profile creation
- **User Profile Management**: Detailed profile with health goals and preferences
- **Context-Based State Management**: Persistent authentication state across app sessions

### � Smart Onboarding Experience
1. **Personal Information**: Name and age collection with validation
2. **Physical Metrics**: Weight and height with metric/imperial unit support
3. **Health Goals**: Choose from weight loss, muscle gain, or healthy eating
4. **Personalized Setup**: Custom calorie targets based on user profile

### 🏠 Intelligent Home Dashboard
- **Personalized Welcome**: Dynamic greeting with user's name and goals
- **Smart Calorie Tracking**: 
  - BMR-based calorie calculation using Mifflin-St Jeor Equation
  - Goal-adjusted targets (deficit/surplus/maintenance)
  - Real-time progress tracking with animated progress bars
  - Remaining/excess calorie indicators
- **AI-Powered Meal Recommendations**: 
  - Morning, afternoon, and dinner suggestions
  - Alternative meal options
  - API-driven meal plans with mock data fallback
- **Interactive Meal Selection**: Checkbox-based meal tracking with calorie updates

### 📱 Enhanced Navigation & UX
- **Tab Navigation**: Home, Profile, and Orders tabs
- **Stack Navigation**: Seamless screen transitions
- **TypeScript Integration**: Full type safety throughout the application
- **Responsive Design**: Optimized for various screen sizes
- **Smooth Animations**: Enhanced user experience with React Native Animated API

### 🍕 Comprehensive Meal Management
- **Detailed Meal Information**: 
  - Nutritional breakdown with calories, ingredients
  - Restaurant information and pricing
  - High-quality meal images
  - Purchase links for direct ordering
- **Meal Plan API Integration**:
  - RESTful API architecture with TypeScript
  - Mock data system for development
  - Error handling and retry mechanisms
  - Automatic fallback systems

### 👤 User Profile System
- **Complete Profile Display**: All onboarding information presented elegantly
- **Goal Visualization**: Health goals with icons and descriptions
- **Metric Conversion**: Automatic unit handling and display
- **Profile Actions**: Edit capabilities and logout functionality

## 🚀 Tech Stack

### Core Technologies
- **Framework**: Expo React Native (SDK 50+)
- **Language**: TypeScript (Full type safety)
- **Navigation**: React Navigation v6 (Stack & Tab Navigation)
- **State Management**: React Context API with custom hooks
- **Styling**: React Native StyleSheet with responsive design

### API & Data Management
- **API Client**: Custom fetch-based client with TypeScript
- **Mock Data System**: Comprehensive mock API for development
- **Error Handling**: Custom error classes and recovery mechanisms
- **Data Validation**: Runtime type checking and validation

### Development Tools
- **TypeScript**: Strict type checking and IntelliSense
- **Metro Bundler**: Fast refresh and hot reloading
- **ESLint**: Code quality and consistency
- **Git**: Version control with meaningful commit history

## 🏗️ Architecture

### Project Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.tsx # Reusable button component
│   │   ├── CustomInput.tsx  # Form input component
│   │   ├── MealCard.tsx     # Meal display component
│   │   ├── MealPlanExample.tsx # API integration example
│   │   └── index.ts         # Component exports
│   ├── hooks/              # Custom React hooks
│   │   ├── useMealPlan.ts  # Meal plan API hook
│   │   └── index.ts        # Hook exports
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx # Main navigation with auth context
│   ├── screens/           # Application screens (TypeScript)
│   │   ├── HomeScreen.tsx     # Main dashboard
│   │   ├── LoginScreen.tsx    # Authentication
│   │   ├── SignupScreen.js    # User registration
│   │   ├── ProfileScreen.tsx  # User profile display
│   │   ├── MealInfoScreen.tsx # Detailed meal view
│   │   └── UserInfo*.js       # Onboarding screens
│   ├── services/          # API services and clients
│   │   ├── apiClient.ts       # Generic API client
│   │   ├── mealPlanAPI.ts     # Meal plan API service
│   │   ├── mockMealPlanAPI.ts # Mock data provider
│   │   └── index.ts           # Service exports
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Global type definitions
│   └── data/             # Static data and utilities
├── assets/               # Static assets (images, fonts)
├── .env.example         # Environment configuration template
├── App.tsx              # Main application entry point
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

### Navigation Architecture
```
Root Navigator (Context-Driven)
├── Auth Stack (Not logged in)
│   ├── Login Screen
│   └── Signup Screen
├── UserInfo Stack (Logged in, no onboarding)
│   ├── Name Input
│   ├── Age Input
│   ├── Physical Info
│   └── Goals Selection
└── Main App (Logged in, onboarding complete)
    ├── Tab Navigator
    │   ├── Home Tab → Home Screen
    │   ├── Profile Tab → Profile Screen
    │   └── Orders Tab → Orders Screen
    └── Modal Stack
        └── Meal Info Screen
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v16 or newer
- **npm**: v8 or newer
- **Expo CLI**: Latest version
- **Expo Go**: Mobile app for testing
- **Git**: For version control

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/doughnut923/aws-TodayWinPoBig.git
cd aws-TodayWinPoBig/frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**:
```bash
npm start
```

5. **Run on device/simulator**:
   - **Physical Device**: Scan QR code with Expo Go app
   - **Android Emulator**: Press 'a' in terminal
   - **iOS Simulator**: Press 'i' in terminal
   - **Web Browser**: Press 'w' in terminal

### Available Scripts

```bash
npm start         # Start Expo development server
npm run android   # Start on Android emulator/device
npm run ios       # Start on iOS simulator/device  
npm run web       # Start web version
npm run build     # Build for production
npm run test      # Run tests (when implemented)
```

## 📱 App Flow & User Journey

### 1. Authentication Flow
```
App Launch → Login Screen → [New User] → Signup → Onboarding
                         → [Existing User] → Home Dashboard
```

### 2. Onboarding Flow
```
Name Input → Age Input → Physical Info → Goals Selection → Home Dashboard
```

### 3. Main App Flow
```
Home Dashboard ↔ Profile Management
       ↓
Meal Selection → Meal Details → Order/Track
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
EXPO_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
EXPO_PUBLIC_API_TIMEOUT=10000

# Development Settings
EXPO_PUBLIC_DEBUG_MODE=true
NODE_ENV=development
```

### TypeScript Configuration
The project uses strict TypeScript settings:
- Strict type checking enabled
- No implicit any types
- Comprehensive type definitions
- IntelliSense support throughout

## 🎯 API Integration

### Meal Plan API
The app integrates with a meal planning API:

**Endpoint**: `POST /GetPlan`
**Request**:
```typescript
{
  UserID: string
}
```

**Response**:
```typescript
{
  morn: APIMeal,
  afternoon: APIMeal,
  dinner: APIMeal,
  Alt: APIMeal[]
}
```

### Mock Data System
- **Development Mode**: Automatically uses mock data
- **Production Ready**: Seamless switch to real API
- **Fallback System**: Graceful degradation if API fails
- **Realistic Data**: 12+ diverse meal options with complete nutrition info

### Usage Examples
```typescript
// Using the custom hook
const { formattedData, loading, error, fetchMealPlan } = useMealPlan();

// Direct API usage
const mealPlan = await MealPlanAPI.getPlan('user123');

// With error handling
try {
  const data = await getMealPlanFormatted('user123');
} catch (error) {
  // Handle errors gracefully
}
```

## 🔍 Key Features Deep Dive

### Smart Calorie Calculation
- **BMR Calculation**: Uses Mifflin-St Jeor Equation
- **Activity Factor**: Moderate activity level (1.55x)
- **Goal Adjustment**: 
  - Weight Loss: -500 calories
  - Muscle Gain: +300 calories
  - Maintenance: No adjustment
- **Unit Conversion**: Automatic metric/imperial handling

### Meal Recommendation System
- **Personalized**: Based on user profile and goals
- **Diverse Options**: 12+ meal varieties
- **Nutritional Balance**: Calorie-conscious recommendations
- **Real-time Updates**: Dynamic meal plan generation

### User Experience Enhancements
- **Loading States**: Visual feedback during API calls
- **Error Recovery**: Retry mechanisms and fallbacks
- **Offline Resilience**: Cached data and mock fallbacks
- **Smooth Animations**: Enhanced UI transitions
- **Type Safety**: Runtime error prevention

## 🧪 Testing & Development

### Development Mode Features
- **Mock API**: Comprehensive fake data system
- **Hot Reload**: Instant code updates
- **Debug Mode**: Console logging and error tracking
- **Type Checking**: Real-time TypeScript validation

### Testing Strategies
```bash
# Type checking
npx tsc --noEmit

# Linting
npx eslint src/

# Manual testing flows
# 1. Authentication flow
# 2. Onboarding completion
# 3. Meal plan loading
# 4. Profile management
```

## 🚀 Deployment & Production

### Production Readiness
- **Environment Configuration**: Staging and production configs
- **API Integration**: Ready for backend connection
- **Performance Optimization**: Lazy loading and code splitting
- **Error Monitoring**: Comprehensive error handling

### Build & Deploy
```bash
# Build for production
expo build:android
expo build:ios

# Publish updates
expo publish
```

## 📚 Documentation

- **[API Documentation](./API_DOCUMENTATION.md)**: Complete API reference
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)**: Recent updates and changes
- **[Navigation Update](./NAVIGATION_UPDATE.md)**: Navigation system details
- **[Checkbox Feature](./CHECKBOX_FEATURE.md)**: Meal tracking functionality

## 🔮 Future Enhancements

### Near Term
- [ ] Real backend API integration
- [ ] User authentication with JWT
- [ ] Push notifications for meal reminders
- [ ] Meal history and tracking
- [ ] Advanced nutrition analytics

### Long Term
- [ ] AI-powered meal recommendations
- [ ] Social features and meal sharing
- [ ] Integration with fitness trackers
- [ ] Meal planning calendar
- [ ] Grocery list generation
- [ ] Restaurant partner integration
- [ ] Nutrition coach AI assistant

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- **TypeScript First**: All new code should be TypeScript
- **Type Safety**: Maintain strict typing throughout
- **Testing**: Write tests for new features
- **Documentation**: Update README for significant changes

## 🐛 Troubleshooting

### Common Issues

**TypeScript Errors**:
```bash
# Clear TypeScript cache
npx tsc --build --clean
```

**Metro Bundler Issues**:
```bash
# Clear Metro cache
npx expo start --clear
```

**Node Modules Issues**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is part of the **AWS AI Hackathon - Smart Food Delivery Nutrition Tracking System**.

## 🙏 Acknowledgments

- **AWS AI Hackathon**: For the opportunity and platform
- **Expo Team**: For the excellent React Native framework
- **React Navigation**: For robust navigation solutions
- **TypeScript Team**: For enhanced development experience

---

**Built with ❤️ using React Native, TypeScript, and Expo**
