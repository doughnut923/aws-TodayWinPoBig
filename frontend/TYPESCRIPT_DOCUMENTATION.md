# 🔷 TypeScript Documentation

This document provides comprehensive documentation for all TypeScript types, interfaces, and type definitions in the Nutri2Go application.

## 🏗️ Type Architecture

The application uses strict TypeScript with comprehensive type safety across all components, screens, and services.

---

## 📊 Core Data Types

### Meal Interface

**Location**: `src/types/index.ts`

Represents a meal item in the frontend format.

```typescript
export interface Meal {
  id: number;          // Unique identifier
  type?: string;       // Optional meal type (breakfast, lunch, dinner)
  name: string;        // Meal name
  restaurant: string;  // Restaurant name
  calories: number;    // Calorie count
  image: string;       // Image URL
  price?: number;      // Optional price
}
```

**Usage Examples**:
```typescript
const breakfast: Meal = {
  id: 1,
  type: 'breakfast',
  name: 'Avocado Toast',
  restaurant: 'Green Kitchen',
  calories: 420,
  image: 'https://example.com/avocado-toast.jpg',
  price: 12
};

// In components
const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => {
  return (
    <View>
      <Text>{meal.name}</Text>
      <Text>{meal.calories} cal</Text>
    </View>
  );
};
```

---

### APIMeal Interface

**Location**: `src/types/index.ts`

Represents meal data in the backend/API format.

```typescript
export interface APIMeal {
  Name: string;           // Meal name (capitalized field)
  Restaurant: string;     // Restaurant name (capitalized field)
  Calorie: number;        // Calorie count (singular form)
  Ingredients: string[];  // Array of ingredients
  Price: number;          // Price (required in API format)
  Purchase_url: string;   // Direct purchase URL
  Image_url: string;      // Image URL (underscore format)
}
```

**API Response Example**:
```typescript
const apiResponse: APIMeal = {
  Name: "Mediterranean Bowl",
  Restaurant: "Fresh Bites",
  Calorie: 450,
  Ingredients: ["quinoa", "chickpeas", "feta", "olives"],
  Price: 14,
  Purchase_url: "https://freshbites.com/order/mediterranean-bowl",
  Image_url: "https://images.freshbites.com/mediterranean-bowl.jpg"
};
```

**Conversion Pattern**:
```typescript
// API to Frontend conversion
const convertAPIMealToMeal = (apiMeal: APIMeal, id: number): Meal => ({
  id,
  name: apiMeal.Name,
  restaurant: apiMeal.Restaurant,
  calories: apiMeal.Calorie,
  image: apiMeal.Image_url,
  price: apiMeal.Price
});
```

---

## 🌐 API Types

### GetPlanRequest

**Location**: `src/types/index.ts`

Request payload for the meal plan API endpoint.

```typescript
export interface GetPlanRequest {
  UserID: string;  // Unique user identifier
}
```

**Usage**:
```typescript
const request: GetPlanRequest = {
  UserID: "john_doe_25"
};

// API call
const response = await fetch('/api/GetPlan', {
  method: 'POST',
  body: JSON.stringify(request)
});
```

### GetPlanResponse

**Location**: `src/types/index.ts`

Response structure from the meal plan API endpoint.

```typescript
export interface GetPlanResponse {
  morn: APIMeal;        // Morning meal recommendation
  afternoon: APIMeal;   // Afternoon meal recommendation
  dinner: APIMeal;      // Dinner meal recommendation
  Alt: APIMeal[];       // Array of alternative meal options
}
```

**Response Example**:
```typescript
const apiResponse: GetPlanResponse = {
  morn: {
    Name: "Greek Yogurt Bowl",
    Restaurant: "Healthy Start",
    Calorie: 320,
    Ingredients: ["greek yogurt", "berries", "granola"],
    Price: 8,
    Purchase_url: "https://healthystart.com/yogurt-bowl",
    Image_url: "https://images.healthystart.com/yogurt-bowl.jpg"
  },
  afternoon: {
    Name: "Grilled Chicken Salad",
    Restaurant: "Garden Fresh",
    Calorie: 380,
    Ingredients: ["chicken", "mixed greens", "tomatoes"],
    Price: 12,
    Purchase_url: "https://gardenfresh.com/chicken-salad",
    Image_url: "https://images.gardenfresh.com/chicken-salad.jpg"
  },
  dinner: {
    Name: "Salmon with Quinoa",
    Restaurant: "Ocean Grill",
    Calorie: 520,
    Ingredients: ["salmon", "quinoa", "vegetables"],
    Price: 18,
    Purchase_url: "https://oceangrill.com/salmon-quinoa",
    Image_url: "https://images.oceangrill.com/salmon-quinoa.jpg"
  },
  Alt: [
    // ... additional alternative meals
  ]
};
```

---

## 👤 User Types

### User Interface

**Location**: `src/types/index.ts`

Complete user profile information collected during onboarding.

```typescript
export interface User {
  firstName: string;              // User's first name
  lastName: string;               // User's last name
  age: number;                    // Age in years
  weight: number;                 // Weight (in kg or lbs based on unit)
  height: number;                 // Height (in cm or inches based on unit)
  unit: 'metric' | 'imperial';    // Unit system preference
  goal: string;                   // Health goal (weight loss, muscle gain, etc.)
}
```

**Usage Examples**:
```typescript
// Complete user profile
const userProfile: User = {
  firstName: "John",
  lastName: "Doe",
  age: 28,
  weight: 75,        // 75 kg
  height: 180,       // 180 cm
  unit: "metric",
  goal: "muscle gain"
};

// Imperial unit example
const imperialUser: User = {
  firstName: "Jane",
  lastName: "Smith",
  age: 32,
  weight: 140,       // 140 lbs
  height: 66,        // 5'6" (66 inches)
  unit: "imperial",
  goal: "weight loss"
};
```

### UserCalorieData Interface

**Location**: `src/types/index.ts`

Tracks user's daily calorie information and meal selections.

```typescript
export interface UserCalorieData {
  dailyCalorieTarget: number;  // Target calories for the day
  currentCalories: number;     // Currently consumed calories
  checkedMeals: Set<number>;   // Set of selected meal IDs
}
```

**Usage Example**:
```typescript
const [calorieData, setCalorieData] = useState<UserCalorieData>({
  dailyCalorieTarget: 2200,
  currentCalories: 850,
  checkedMeals: new Set([1, 3, 7])  // IDs of selected meals
});

// Update when meal is selected/deselected
const toggleMeal = (mealId: number, calories: number) => {
  setCalorieData(prev => {
    const newCheckedMeals = new Set(prev.checkedMeals);
    let newCurrentCalories = prev.currentCalories;
    
    if (newCheckedMeals.has(mealId)) {
      newCheckedMeals.delete(mealId);
      newCurrentCalories -= calories;
    } else {
      newCheckedMeals.add(mealId);
      newCurrentCalories += calories;
    }
    
    return {
      ...prev,
      checkedMeals: newCheckedMeals,
      currentCalories: newCurrentCalories
    };
  });
};
```

---

## 🧭 Navigation Types

### RootStackParamList

**Location**: `src/types/index.ts`

Defines the parameter structure for the root stack navigator.

```typescript
export type RootStackParamList = {
  Auth: undefined;                    // Auth stack (no parameters)
  UserInfoFlow: undefined;            // Onboarding flow (no parameters)
  Main: undefined;                    // Main tab navigator (no parameters)
  MealInfo: { meal: Meal };          // Meal detail screen (requires meal parameter)
};
```

### TabParamList

**Location**: `src/types/index.ts`

Defines the parameter structure for the bottom tab navigator.

```typescript
export type TabParamList = {
  Home: undefined;      // Home screen (no parameters)
  Profile: undefined;   // Profile screen (no parameters)
  Orders: undefined;    // Orders screen (no parameters)
};
```

### UserInfoStackParamList

**Location**: `src/types/index.ts`

Defines the parameter structure for the onboarding flow.

```typescript
export type UserInfoStackParamList = {
  UserInfoName: undefined;      // Name input screen
  UserInfoAge: undefined;       // Age input screen
  UserInfoPhysical: undefined;  // Physical info screen
  UserInfoGoals: undefined;     // Goals selection screen
};
```

### AuthStackParamList

**Location**: `src/types/index.ts`

Defines the parameter structure for authentication screens.

```typescript
export type AuthStackParamList = {
  Login: undefined;     // Login screen (no parameters)
  Signup: undefined;    // Signup screen (no parameters)
};
```

### Navigation Prop Types

```typescript
// Composite navigation type for Home screen
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

// Simple navigation types
export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;
```

**Usage in Components**:
```typescript
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleMealPress = (meal: Meal) => {
    // TypeScript knows this navigation call is valid
    navigation.navigate('MealInfo', { meal });
  };
  
  return (
    // Component content
  );
};
```

---

## 🎨 Component Prop Types

### MealCardProps

**Location**: `src/types/index.ts`

Props for the MealCard component.

```typescript
export interface MealCardProps {
  meal: Meal;                              // Required meal data
  onPress?: (meal: Meal) => void;         // Optional press handler
  style?: any;                            // Optional styling
  isChecked?: boolean;                    // Checkbox state
  onCheckboxPress?: (meal: Meal) => void; // Optional checkbox handler
}
```

### CustomButtonProps

**Location**: `src/types/index.ts`

Props for the CustomButton component.

```typescript
export interface CustomButtonProps {
  title: string;                           // Button text
  onPress: () => void;                    // Press handler
  style?: any;                            // Optional container styling
  textStyle?: any;                        // Optional text styling
  disabled?: boolean;                     // Disabled state
  loading?: boolean;                      // Loading state
  variant?: 'primary' | 'secondary' | 'outline'; // Visual variant
}
```

### CustomInputProps

**Location**: `src/types/index.ts`

Props for the CustomInput component.

```typescript
export interface CustomInputProps {
  value: string;                          // Input value
  onChangeText: (text: string) => void;   // Change handler
  placeholder?: string;                   // Placeholder text
  style?: any;                           // Container styling
  inputStyle?: any;                      // Input styling
  secureTextEntry?: boolean;             // Password mode
  keyboardType?: KeyboardTypeOptions;    // Keyboard type
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;                        // Error message
  label?: string;                        // Input label
  multiline?: boolean;                   // Multi-line support
  numberOfLines?: number;                // Lines for multiline
  maxLength?: number;                    // Character limit
  editable?: boolean;                    // Editable state
}
```

---

## 🔄 Context Types

### AuthContextType

**Location**: `src/types/index.ts`

Type definition for the authentication context.

```typescript
export interface AuthContextType {
  isLoggedIn: boolean;                                    // Login state
  setIsLoggedIn: (loggedIn: boolean) => void;            // Login state setter
  hasCompletedOnboarding: boolean;                       // Onboarding completion state
  setHasCompletedOnboarding: (completed: boolean) => void; // Onboarding setter
  userEmail?: string;                                     // User email (optional)
  setUserEmail: (email: string) => void;                 // Email setter
  userData?: User;                                        // Complete user data (optional)
  setUserData: (data: User) => void;                     // User data setter
  login: () => void;                                      // Login function
  logout: () => void;                                     // Logout function
  completeOnboarding: (userData: User) => void;          // Complete onboarding
}
```

**Context Usage**:
```typescript
// In AuthProvider
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  
  const value: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    userData,
    setUserData,
    login: () => setIsLoggedIn(true),
    logout: () => {
      setIsLoggedIn(false);
      setHasCompletedOnboarding(false);
      setUserData(undefined);
    },
    completeOnboarding: (data: User) => {
      setUserData(data);
      setHasCompletedOnboarding(true);
    }
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// In components
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { userData, isLoggedIn } = useAuth();
  
  if (!isLoggedIn || !userData) {
    return <LoginPrompt />;
  }
  
  return (
    <View>
      <Text>Welcome, {userData.firstName}!</Text>
    </View>
  );
};
```

---

## 🛠️ Hook Types

### UseMealPlanReturn

**Location**: `src/hooks/useMealPlan.ts`

Return type for the useMealPlan custom hook.

```typescript
interface UseMealPlanState {
  data: GetPlanResponse | null;                                    // Raw API response
  formattedData: ReturnType<typeof MealPlanAPI.convertGetPlanResponse> | null; // Formatted data
  loading: boolean;                                                // Loading state
  error: string | null;                                           // Error message
}

interface UseMealPlanReturn extends UseMealPlanState {
  fetchMealPlan: (userID: string) => Promise<void>;              // Fetch function
  refetch: () => Promise<void>;                                  // Refetch function
  clearError: () => void;                                        // Clear error function
}
```

**Hook Usage**:
```typescript
const HomeScreen: React.FC = () => {
  const { 
    formattedData, 
    loading, 
    error, 
    fetchMealPlan,
    clearError 
  } = useMealPlan();
  
  useEffect(() => {
    const userID = generateUserID();
    fetchMealPlan(userID);
  }, [fetchMealPlan]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <ErrorView 
        message={error} 
        onRetry={() => {
          clearError();
          fetchMealPlan(userID);
        }}
      />
    );
  }
  
  return (
    <MealPlanView data={formattedData} />
  );
};
```

---

## 🔧 Utility Types

### Screen Props Pattern

**Location**: `src/types/index.ts`

Standard pattern for screen component props.

```typescript
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export interface MealInfoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'MealInfo'>;
  route: { params: { meal: Meal } };
}
```

### API Error Type

**Location**: `src/services/apiClient.ts`

Custom error class for API-related errors.

```typescript
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public type: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

**Usage**:
```typescript
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) {
    throw new APIError('Request failed', response.status, 'HTTP_ERROR');
  }
} catch (error) {
  if (error instanceof APIError) {
    console.log(`API Error ${error.statusCode}: ${error.message}`);
  } else {
    console.log('Unknown error:', error);
  }
}
```

---

## 🎯 Type Guards and Validation

### Type Guards

```typescript
// Type guard for User interface
const isValidUser = (obj: any): obj is User => {
  return (
    obj &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.age === 'number' &&
    typeof obj.weight === 'number' &&
    typeof obj.height === 'number' &&
    (obj.unit === 'metric' || obj.unit === 'imperial') &&
    typeof obj.goal === 'string'
  );
};

// Type guard for Meal interface
const isValidMeal = (obj: any): obj is Meal => {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.restaurant === 'string' &&
    typeof obj.calories === 'number' &&
    typeof obj.image === 'string'
  );
};
```

**Usage in API responses**:
```typescript
const validateAPIResponse = (response: any): GetPlanResponse => {
  if (!response.morn || !response.afternoon || !response.dinner) {
    throw new APIError('Invalid response format', 422, 'VALIDATION_ERROR');
  }
  
  return response as GetPlanResponse;
};
```

---

## 🚀 Advanced TypeScript Features

### Generic Types

```typescript
// Generic API response wrapper
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Usage with meal plan
type MealPlanAPIResponse = APIResponse<GetPlanResponse>;

// Generic hook state
interface HookState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Usage
const useMealPlan = (): HookState<GetPlanResponse> & {
  fetchData: () => Promise<void>;
} => {
  // Hook implementation
};
```

### Conditional Types

```typescript
// Conditional prop types based on variant
type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps<T extends ButtonVariant> = {
  variant: T;
  title: string;
} & (T extends 'primary' 
  ? { emphasis?: boolean } 
  : T extends 'outline'
  ? { borderColor?: string }
  : {}
);

// Usage
const primaryButton: ButtonProps<'primary'> = {
  variant: 'primary',
  title: 'Submit',
  emphasis: true  // Only available for primary variant
};
```

### Mapped Types

```typescript
// Create partial version of User for form state
type UserFormData = {
  [K in keyof User]?: User[K];
};

// Create readonly version
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Pick specific fields
type UserBasicInfo = Pick<User, 'firstName' | 'lastName' | 'age'>;

// Omit specific fields
type UserWithoutSensitiveData = Omit<User, 'weight' | 'height'>;
```

---

## 🧪 Testing Types

### Mock Types for Testing

```typescript
// Mock navigation type
type MockNavigation = {
  navigate: jest.Mock;
  goBack: jest.Mock;
  setOptions: jest.Mock;
};

// Mock context type
type MockAuthContext = Partial<AuthContextType>;

// Test data factory types
type TestMealFactory = () => Meal;
type TestUserFactory = () => User;

// Usage in tests
const createMockMeal: TestMealFactory = () => ({
  id: 1,
  name: 'Test Meal',
  restaurant: 'Test Restaurant',
  calories: 500,
  image: 'test-image.jpg'
});
```

---

## 📋 Type Checklist

### Before Adding New Types

- [ ] **Clear Naming**: Use descriptive, unambiguous names
- [ ] **Documentation**: Add JSDoc comments for complex types
- [ ] **Consistency**: Follow existing naming conventions
- [ ] **Validation**: Consider type guards for runtime validation
- [ ] **Reusability**: Make types generic where appropriate
- [ ] **Export**: Properly export from `src/types/index.ts`

### Type Safety Best Practices

- [ ] **Strict Mode**: Always use TypeScript strict mode
- [ ] **No Any**: Avoid `any` type, use `unknown` instead
- [ ] **Proper Imports**: Import types explicitly
- [ ] **Interface vs Type**: Use interfaces for object shapes, types for unions/utilities
- [ ] **Optional Properties**: Use `?` for truly optional properties
- [ ] **Readonly**: Use `readonly` for immutable data

This comprehensive TypeScript documentation ensures type safety and developer experience across the entire Nutri2Go application! 🚀