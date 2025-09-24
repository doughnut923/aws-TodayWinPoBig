# 📦 Component Documentation

This document provides comprehensive documentation for all React components in the Nutri2Go application.

## 🏗️ Component Architecture

All components follow TypeScript strict typing and React functional component patterns with hooks.

---

## 🍽️ MealCard Component

**Location**: `src/components/MealCard.tsx`

A highly interactive card component that displays meal information with animated interactions and checkbox functionality.

### Props Interface

```typescript
interface MealCardProps {
  meal: Meal;                              // Required meal data object
  onPress?: (meal: Meal) => void;         // Optional callback when card is pressed
  style?: any;                            // Optional additional styling
  isChecked?: boolean;                    // Checkbox state (default: false)
  onCheckboxPress?: (meal: Meal) => void; // Optional checkbox callback
}
```

### Features

- ✅ **Animated Interactions**: Smooth scale/opacity animations when checked/unchecked
- ✅ **Checkbox Integration**: Optional checkbox with separate press handling
- ✅ **Visual Feedback**: Card opacity changes and "ORDERED" text overlay
- ✅ **Touch Events**: Separate handling for card tap vs checkbox tap
- ✅ **Type Safety**: Full TypeScript integration

### Usage Examples

```tsx
// Basic meal card
<MealCard 
  meal={meal} 
  onPress={(meal) => navigation.navigate('MealInfo', { meal })} 
/>

// With checkbox functionality
<MealCard 
  meal={meal}
  isChecked={checkedMeals.has(meal.id)}
  onCheckboxPress={handleMealCheckbox}
  onPress={handleMealPress}
/>

// With custom styling
<MealCard 
  meal={meal}
  style={styles.customCard}
  onPress={handlePress}
/>
```

### Animation Details

- **Checkbox Scale**: 1.0 → 1.2 when checked (500ms duration)
- **Card Opacity**: 1.0 → 0.8 when checked (500ms duration)
- **Ordered Text**: 0 → 1 opacity when checked (500ms duration)

### Visual States

| State | Card Opacity | Checkbox Scale | "ORDERED" Text | Visual Effect |
|-------|--------------|----------------|----------------|---------------|
| Default | 1.0 | 1.0 | Hidden | Clean, prominent |
| Checked | 0.8 | 1.2 | Visible | Dimmed with overlay |

---

## 🔘 CustomButton Component

**Location**: `src/components/CustomButton.tsx`

A versatile, reusable button component with multiple variants and built-in loading states.

### Props Interface

```typescript
interface CustomButtonProps {
  title: string;                           // Button text
  onPress: () => void;                    // Press callback
  style?: any;                            // Optional container styling
  textStyle?: any;                        // Optional text styling
  disabled?: boolean;                     // Disabled state (default: false)
  loading?: boolean;                      // Loading state with spinner (default: false)
  variant?: 'primary' | 'secondary' | 'outline'; // Visual variant (default: 'primary')
}
```

### Variants

#### Primary (Default)
- **Background**: Blue gradient (#007AFF)
- **Text**: White
- **Use Case**: Main actions (Login, Signup, Continue)

#### Secondary
- **Background**: Light gray (#F0F0F0)
- **Text**: Dark gray (#333)
- **Use Case**: Alternative actions (Cancel, Skip)

#### Outline
- **Background**: Transparent
- **Border**: 1px solid #007AFF
- **Text**: Blue (#007AFF)
- **Use Case**: Subtle actions (Learn More, Settings)

### Usage Examples

```tsx
// Primary button (default)
<CustomButton 
  title="Continue" 
  onPress={handleContinue} 
/>

// Secondary button
<CustomButton 
  title="Skip"
  variant="secondary"
  onPress={handleSkip}
/>

// Outline button
<CustomButton 
  title="Learn More"
  variant="outline"
  onPress={handleLearnMore}
/>

// Loading state
<CustomButton 
  title="Logging in..."
  loading={isLoading}
  disabled={isLoading}
  onPress={handleLogin}
/>
```

### States

- **Default**: Normal interactive state
- **Pressed**: Slight opacity reduction (0.8)
- **Disabled**: Reduced opacity (0.5), no interaction
- **Loading**: Shows spinner, disabled interaction

---

## 📝 CustomInput Component

**Location**: `src/components/CustomInput.tsx`

A comprehensive input component with validation, error handling, and various input types.

### Props Interface

```typescript
interface CustomInputProps {
  value: string;                          // Current input value
  onChangeText: (text: string) => void;   // Text change callback
  placeholder?: string;                   // Placeholder text
  style?: any;                           // Container styling
  inputStyle?: any;                      // Input field styling
  secureTextEntry?: boolean;             // Password mode (default: false)
  keyboardType?: KeyboardTypeOptions;    // Keyboard type
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;                        // Error message
  label?: string;                        // Input label
  multiline?: boolean;                   // Multi-line support
  numberOfLines?: number;                // Lines for multiline
  maxLength?: number;                    // Character limit
  editable?: boolean;                    // Editable state (default: true)
}
```

### Features

- ✅ **Input Validation**: Built-in error display
- ✅ **Multiple Types**: Text, password, email, numeric
- ✅ **Accessibility**: Proper labels and hints
- ✅ **Responsive Design**: Adapts to content and screen size
- ✅ **Error Handling**: Visual error states with messages

### Usage Examples

```tsx
// Basic text input
<CustomInput
  value={name}
  onChangeText={setName}
  placeholder="Enter your name"
  label="Full Name"
/>

// Password input
<CustomInput
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  secureTextEntry={true}
  label="Password"
/>

// Email input with validation
<CustomInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  keyboardType="email-address"
  autoCapitalize="none"
  error={emailError}
  label="Email Address"
/>

// Numeric input
<CustomInput
  value={age}
  onChangeText={setAge}
  placeholder="Enter age"
  keyboardType="numeric"
  label="Age"
  maxLength={3}
/>
```

### Error Handling

```tsx
// With validation error
<CustomInput
  value={email}
  onChangeText={setEmail}
  error={emailError} // Shows red border and error text
  placeholder="Email"
/>
```

---

## 📊 Component Usage Patterns

### Common Patterns Across Components

#### 1. TypeScript Integration
All components use strict TypeScript interfaces for props and maintain type safety throughout.

#### 2. Styling Architecture
```tsx
const styles = StyleSheet.create({
  // Component-specific styles
  // Follows naming convention: componentName + element
  cardContainer: { /* styles */ },
  cardTitle: { /* styles */ },
  cardButton: { /* styles */ }
});
```

#### 3. Animation Integration
Components use React Native's Animated API for smooth interactions:

```tsx
const animatedValue = useRef(new Animated.Value(1)).current;

useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: newValue,
    duration: 500,
    useNativeDriver: true,
  }).start();
}, [dependency]);
```

#### 4. Event Handling
Consistent event handling patterns with proper TypeScript typing:

```tsx
const handlePress = (item: ItemType): void => {
  // Handle event with proper typing
  onItemPress?.(item);
};
```

---

## 🎨 Design System Integration

### Color Palette
```typescript
const colors = {
  primary: '#007AFF',      // iOS blue
  secondary: '#FF6B35',    // Orange accent
  success: '#28A745',      // Green
  error: '#DC3545',        // Red
  warning: '#FFC107',      // Yellow
  background: '#F8F9FA',   // Light gray
  surface: '#FFFFFF',      // White
  text: '#212529',         // Dark gray
  textSecondary: '#6C757D', // Medium gray
};
```

### Typography
```typescript
const typography = {
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 14, fontWeight: '300' },
};
```

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

---

## 🧪 Testing Components

### Component Testing Patterns

```tsx
// Example test structure
import { render, fireEvent } from '@testing-library/react-native';
import MealCard from '../MealCard';

describe('MealCard Component', () => {
  const mockMeal = {
    id: 1,
    name: 'Test Meal',
    restaurant: 'Test Restaurant',
    calories: 500,
    image: 'test-image.jpg'
  };

  test('renders meal information correctly', () => {
    const { getByText } = render(<MealCard meal={mockMeal} />);
    expect(getByText('Test Meal')).toBeTruthy();
    expect(getByText('Test Restaurant')).toBeTruthy();
  });

  test('handles press events', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <MealCard meal={mockMeal} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByTestId('meal-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mockMeal);
  });
});
```

---

## 🚀 Best Practices

### 1. Component Structure
```tsx
// 1. Imports (React, RN, then local)
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ComponentProps } from '../types';

// 2. Component definition
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 3. State and hooks
  const [state, setState] = useState();
  
  // 4. Effects and callbacks
  useEffect(() => {}, []);
  
  // 5. Render
  return <View></View>;
};

// 6. Styles
const styles = StyleSheet.create({});

// 7. Export
export default Component;
```

### 2. Props Design
- Use TypeScript interfaces for all props
- Provide sensible defaults
- Use optional chaining for callbacks
- Include proper JSDoc comments

### 3. State Management
- Use local state for component-specific data
- Lift state up when shared between components
- Use context for app-wide state

### 4. Performance
- Use React.memo() for expensive components
- Implement proper dependency arrays for hooks
- Use useCallback for event handlers passed as props

---

## 📱 Responsive Design

### Screen Adaptation
Components automatically adapt to different screen sizes using:

```tsx
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,  // 90% of screen width
    height: height * 0.1, // 10% of screen height
  }
});
```

### Safe Area Support
All screen-level components use SafeAreaView for proper device adaptation:

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={styles.container}>
  {/* Component content */}
</SafeAreaView>
```