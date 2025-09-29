import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

// Core data types
export interface Meal {
  id: number;
  type?: string;
  name: string;
  restaurant: string;
  calories: number;
  image: string;
  price?: number;
  ingredients: string[];
  purchase_url: string;
}

// API-specific Meal type (backend format)
export interface APIMeal {
  Name: string;
  Restaurant: string;
  Calorie: number;
  Ingredients: string[];
  Price: number;
  Purchase_url: string;
  Image_url: string;
}

// API request/response types
export interface GetPlanRequest {
  UserID: string;
}

export interface GetPlanResponse {
  morn: APIMeal;
  afternoon: APIMeal;
  dinner: APIMeal;
  Alt: APIMeal[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
  goal: string;
  location: string;
}

export interface UserCalorieData {
  dailyCalorieTarget: number;
  currentCalories: number;
  checkedMeals: Set<number>;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  UserInfoFlow: undefined;
  Main: undefined;
  MealInfo: { meal: Meal };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Orders: undefined;
};

export type UserInfoStackParamList = {
  UserInfoName: undefined;
  UserInfoAge: undefined;
  UserInfoPhysical: undefined;
  UserInfoLocation: undefined;
  UserInfoGoals: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// Navigation types and props
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;
export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}
export interface MealCardProps {
  meal: Meal;
  onPress?: (meal: Meal) => void;
  style?: any;
  isChecked?: boolean;
  onCheckboxPress?: (meal: Meal) => void;
}

export interface MealInfoScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'MealInfo'>;
  route: { params: { meal: Meal } };
}

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface CustomInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

// Context types
export interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  userInfo: Partial<User>;
  setUserInfo: (info: Partial<User>) => void;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  userEmail?: string;
  setUserEmail: (email: string) => void;
  userData?: User;
  setUserData: (data: User) => void;
  login: () => void;
  signupLogin: () => void;
  logout: () => void;
  completeOnboarding: (userData: User) => void;
}