# 📱 Screen Component Documentation

This document provides comprehensive documentation for all screen components in the Nutri2Go application.

## 🏗️ Screen Architecture

All screens follow React Native navigation patterns with TypeScript integration and context-based state management.

---

## 🏠 HomeScreen Component

**Location**: `src/screens/HomeScreen.tsx`

The main dashboard screen that provides personalized meal recommendations and calorie tracking.

### Props Interface

```typescript
interface HomeScreenProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >;
}
```

### Features

- ✅ **Personalized Welcome**: Dynamic greeting with user's name and goals
- ✅ **Smart Calorie Tracking**: BMR-based calculations with progress visualization
- ✅ **API-Driven Meal Plans**: Integration with meal plan API and mock data fallback
- ✅ **Interactive Meal Cards**: Checkbox-based meal tracking with calorie updates
- ✅ **Loading States**: Comprehensive loading and error handling
- ✅ **Animated UI**: Smooth progress bars and transitions

### Context Dependencies

```typescript
const { userData } = useAuth();
const { 
  formattedData: mealPlanData, 
  loading: mealPlanLoading, 
  error: mealPlanError, 
  fetchMealPlan 
} = useMealPlan();
```

### State Management

```typescript
// Local state for calorie tracking
const [userCalorieData, setUserCalorieData] = useState<UserCalorieData>({
  dailyCalorieTarget: 2000,
  currentCalories: 0,
  checkedMeals: new Set<number>()
});

// Progress animation
const progressAnimation = useRef(new Animated.Value(0)).current;
```

### Key Functions

#### Calorie Calculation
```typescript
const calculateCalorieTarget = (user: User): number => {
  // BMR calculation using Mifflin-St Jeor Equation
  let bmr: number;
  
  if (user.unit === 'metric') {
    bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age;
  } else {
    const weightKg = user.weight * 0.453592;
    const heightCm = user.height * 2.54;
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * user.age;
  }
  
  // Apply activity factor and goal adjustment
  const tdee = bmr * 1.55; // Moderate activity
  
  switch(user.goal.toLowerCase()) {
    case 'weight loss': return Math.round(tdee - 500);
    case 'muscle gain': return Math.round(tdee + 300);
    default: return Math.round(tdee);
  }
};
```

#### Meal Selection Handler
```typescript
const handleMealCheckbox = (meal: Meal) => {
  setUserCalorieData(prev => {
    const newCheckedMeals = new Set(prev.checkedMeals);
    let newCurrentCalories = prev.currentCalories;
    
    if (newCheckedMeals.has(meal.id)) {
      newCheckedMeals.delete(meal.id);
      newCurrentCalories -= meal.calories;
    } else {
      newCheckedMeals.add(meal.id);
      newCurrentCalories += meal.calories;
    }
    
    return {
      ...prev,
      checkedMeals: newCheckedMeals,
      currentCalories: newCurrentCalories
    };
  });
};
```

### Usage Example

```tsx
export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
```

---

## 🔐 LoginScreen Component

**Location**: `src/screens/LoginScreen.tsx`

Authentication screen with form validation and context integration.

### Props Interface

```typescript
interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
}
```

### Features

- ✅ **Form Validation**: Email and password validation
- ✅ **Loading States**: Button loading during authentication
- ✅ **Error Handling**: Display validation and API errors
- ✅ **Navigation Integration**: Seamless flow to signup or main app
- ✅ **Context Integration**: Updates auth state on successful login

### State Management

```typescript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const [formErrors, setFormErrors] = useState({
  email: '',
  password: ''
});

const [isLoading, setIsLoading] = useState(false);
```

### Validation Logic

```typescript
const validateForm = (): boolean => {
  const errors = { email: '', password: '' };
  let isValid = true;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email';
    isValid = false;
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
```

---

## 📝 SignupScreen Component

**Location**: `src/screens/SignupScreen.js`

User registration screen with comprehensive validation.

### Features

- ✅ **Account Creation**: Email/password registration
- ✅ **Form Validation**: Client-side validation with error messages
- ✅ **Password Confirmation**: Matching password verification
- ✅ **Navigation Flow**: Direct to onboarding after successful signup
- ✅ **Loading States**: Visual feedback during registration process

---

## 👤 ProfileScreen Component

**Location**: `src/screens/ProfileScreen.tsx`

User profile display screen showing onboarding information and account options.

### Features

- ✅ **Complete Profile Display**: All user information from onboarding
- ✅ **Goal Visualization**: Health goals with descriptive icons
- ✅ **Metric Conversion**: Automatic unit handling and display
- ✅ **Logout Functionality**: Context-integrated logout
- ✅ **Future Edit Capabilities**: Prepared for profile editing

### Profile Information Display

```typescript
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { userData, logout } = useAuth();
  
  const profileSections = [
    {
      title: 'Personal Information',
      data: [
        { label: 'Name', value: `${userData?.firstName} ${userData?.lastName}` },
        { label: 'Age', value: `${userData?.age} years old` }
      ]
    },
    {
      title: 'Physical Information',
      data: [
        { 
          label: 'Weight', 
          value: userData?.unit === 'metric' 
            ? `${userData?.weight} kg` 
            : `${userData?.weight} lbs` 
        },
        { 
          label: 'Height', 
          value: userData?.unit === 'metric'
            ? `${userData?.height} cm`
            : `${Math.floor(userData?.height / 12)}'${userData?.height % 12}"`
        }
      ]
    }
  ];
  
  return (
    <SafeAreaView>
      {profileSections.map(section => (
        <ProfileSection key={section.title} section={section} />
      ))}
    </SafeAreaView>
  );
};
```

---

## 🍽️ MealInfoScreen Component

**Location**: `src/screens/MealInfoScreen.tsx`

Detailed meal information screen with ordering functionality.

### Props Interface

```typescript
interface MealInfoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'MealInfo'>;
  route: { params: { meal: Meal } };
}
```

### Features

- ✅ **Detailed Meal Display**: Complete meal information
- ✅ **Nutritional Information**: Calories, ingredients, and tags
- ✅ **Restaurant Details**: Restaurant name and information
- ✅ **Order Integration**: Direct ordering through purchase URLs
- ✅ **Navigation Integration**: Proper back navigation

### Route Parameters

```typescript
const { meal } = route.params;

// Meal object structure:
{
  id: number;
  name: string;
  restaurant: string;
  calories: number;
  image: string;
  price?: number;
  ingredients?: string[];
  tags?: string[];
}
```

---

## 🚶‍♂️ Onboarding Screens

### UserInfoNameScreen

**Location**: `src/screens/UserInfoNameScreen.js`

Collects user's first and last name with validation.

### UserInfoAgeScreen

**Location**: `src/screens/UserInfoAgeScreen.js`

Age input with numeric validation and reasonable bounds checking.

### UserInfoPhysicalScreen

**Location**: `src/screens/UserInfoPhysicalScreen.js`

Weight and height collection with metric/imperial unit selection.

### UserInfoGoalsScreen

**Location**: `src/screens/UserInfoGoalsScreen.js`

Health goal selection with visual goal cards.

### Onboarding Flow

```typescript
// Navigation flow through onboarding
UserInfoName → UserInfoAge → UserInfoPhysical → UserInfoGoals → HomeScreen

// Data collection pattern
const [userData, setUserData] = useState<Partial<User>>({});

const handleNext = (data: Partial<User>) => {
  setUserData(prev => ({ ...prev, ...data }));
  navigation.navigate('NextScreen');
};

// Final onboarding completion
const completeOnboarding = () => {
  const { completeOnboarding } = useAuth();
  completeOnboarding(userData as User);
  // Navigation handled automatically by auth state change
};
```

---

## 🧭 Navigation Integration

### Navigation Types

```typescript
// Root navigation structure
export type RootStackParamList = {
  Auth: undefined;
  UserInfoFlow: undefined;
  Main: undefined;
  MealInfo: { meal: Meal };
};

// Tab navigation structure
export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Orders: undefined;
};
```

### Navigation Patterns

#### Screen-to-Screen Navigation
```typescript
// Navigate with parameters
navigation.navigate('MealInfo', { meal: selectedMeal });

// Simple navigation
navigation.navigate('Profile');

// Go back
navigation.goBack();
```

#### Context-Driven Navigation
```typescript
// Navigation based on auth state
function RootNavigator() {
  const { isLoggedIn, hasCompletedOnboarding } = useAuth();
  
  return (
    <Stack.Navigator>
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
```

---

## 🎨 Screen Design Patterns

### Layout Structure

```tsx
// Standard screen layout pattern
const Screen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Screen Title</Text>
          <Text style={styles.subtitle}>Screen Description</Text>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Screen-specific content */}
        </View>
        
        {/* Footer/Actions */}
        <View style={styles.footer}>
          <CustomButton 
            title="Action"
            onPress={handleAction}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
```

### Error Handling Pattern

```tsx
// Consistent error handling across screens
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleAsyncAction = async () => {
  try {
    setLoading(true);
    setError(null);
    
    await performAction();
    
  } catch (err: any) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};

// Error display
{error && (
  <Text style={styles.errorText}>{error}</Text>
)}
```

### Loading States Pattern

```tsx
// Loading state management
{loading ? (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
) : (
  <MainContent />
)}
```

---

## 📱 Responsive Design

### Screen Adaptation

```tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of screen width
  },
  
  // Responsive font sizing
  title: {
    fontSize: width > 400 ? 24 : 20,
    fontWeight: '700',
  },
  
  // Responsive spacing
  section: {
    marginVertical: height * 0.02, // 2% of screen height
  }
});
```

### Safe Area Integration

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

// Proper safe area usage
<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
  <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
  {/* Screen content */}
</SafeAreaView>
```

---

## 🧪 Screen Testing Patterns

### Navigation Testing

```tsx
// Mock navigation for testing
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
} as any;

test('navigates to meal info on meal press', () => {
  const { getByTestId } = render(
    <AuthProvider>
      <HomeScreen navigation={mockNavigation} />
    </AuthProvider>
  );
  
  const mealCard = getByTestId('meal-card-1');
  fireEvent.press(mealCard);
  
  expect(mockNavigation.navigate).toHaveBeenCalledWith('MealInfo', {
    meal: expect.any(Object)
  });
});
```

### Context Testing

```tsx
// Test with mock context
const mockAuthContext = {
  userData: { name: 'Test User', age: 25 },
  isLoggedIn: true,
  hasCompletedOnboarding: true,
};

test('displays user data correctly', () => {
  const { getByText } = render(
    <AuthContext.Provider value={mockAuthContext}>
      <ProfileScreen navigation={mockNavigation} />
    </AuthContext.Provider>
  );
  
  expect(getByText('Test User')).toBeTruthy();
});
```

---

## 🚀 Performance Optimization

### Screen-Level Optimizations

```tsx
// Memoize expensive components
const MemoizedMealCard = React.memo(MealCard);

// Use callback for event handlers
const handleMealPress = useCallback((meal: Meal) => {
  navigation.navigate('MealInfo', { meal });
}, [navigation]);

// Optimize list rendering
<FlatList
  data={meals}
  renderItem={({ item }) => (
    <MemoizedMealCard 
      meal={item} 
      onPress={handleMealPress}
    />
  )}
  keyExtractor={(item) => item.id.toString()}
  removeClippedSubviews={true}
  maxToRenderPerBatch={5}
  windowSize={10}
/>
```

### State Update Optimization

```tsx
// Batch state updates
const handleMultipleUpdates = () => {
  setUserCalorieData(prev => ({
    ...prev,
    currentCalories: prev.currentCalories + mealCalories,
    checkedMeals: new Set([...prev.checkedMeals, mealId])
  }));
};
```