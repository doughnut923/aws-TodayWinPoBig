# Meal Plan API Handler

This module provides a complete API handler for the GetPlan endpoint with TypeScript support, error handling, and React hooks for easy integration.

## 📁 File Structure

```
src/
├── services/
│   ├── apiClient.ts      # Generic API client with error handling
│   ├── mealPlanAPI.ts    # Specific meal plan API functions
│   └── index.ts          # Service exports
├── hooks/
│   ├── useMealPlan.ts    # React hook for meal plan management
│   └── index.ts          # Hook exports
├── types/
│   └── index.ts          # Updated with API types
└── components/
    └── MealPlanExample.tsx # Example component usage
```

## 🎯 API Endpoint Details

**Endpoint:** `POST /GetPlan`

**Request Body:**
```typescript
{
  UserID: string
}
```

**Response Body:**
```typescript
{
  morn: APIMeal,
  afternoon: APIMeal,
  dinner: APIMeal,
  Alt: APIMeal[]
}
```

**APIMeal Type:**
```typescript
{
  Name: string,
  Restaurant: string,
  Calorie: number,
  Ingredients: string[],
  Price: number,
  Purchase_url: string,
  Image_url: string
}
```

## 🚀 Usage Examples

### 1. Using the API Class Directly

```typescript
import { MealPlanAPI } from '../services';

// Fetch raw API response
const mealPlan = await MealPlanAPI.getPlan('user123');

// Fetch formatted response (converted to app format)
const formatted = await MealPlanAPI.getPlanFormatted('user123');
```

### 2. Using the React Hook (Recommended)

```typescript
import { useMealPlan } from '../hooks';

function MyComponent() {
  const { 
    data, 
    formattedData, 
    loading, 
    error, 
    fetchMealPlan 
  } = useMealPlan();

  const handleGetPlan = async () => {
    await fetchMealPlan('user123');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <button onClick={handleGetPlan}>Get Meal Plan</button>
      {formattedData && (
        <div>
          <h3>Morning: {formattedData.morning.name}</h3>
          <h3>Afternoon: {formattedData.afternoon.name}</h3>
          <h3>Dinner: {formattedData.dinner.name}</h3>
        </div>
      )}
    </div>
  );
}
```

### 3. Using Convenience Functions

```typescript
import { getMealPlan, getMealPlanFormatted } from '../services';

// Get raw API response
const rawData = await getMealPlan('user123');

// Get formatted data
const formattedData = await getMealPlanFormatted('user123');
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
EXPO_PUBLIC_API_TIMEOUT=10000
```

### API Configuration

The API client can be configured in `apiClient.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-backend-api.com/api',
  ENDPOINTS: {
    GET_PLAN: '/GetPlan',
  },
  TIMEOUT: 10000,
};
```

## 🛡️ Error Handling

The API handler provides comprehensive error handling:

```typescript
try {
  const mealPlan = await MealPlanAPI.getPlan('user123');
} catch (error) {
  if (error instanceof APIError) {
    console.log('API Error:', error.status, error.message);
  } else {
    console.log('Network Error:', error.message);
  }
}
```

### Error Types

- **400**: Invalid user ID
- **404**: User not found
- **408**: Request timeout
- **500+**: Server errors
- **Network**: Connection issues

## 🔄 Data Conversion

The API automatically converts between backend and frontend formats:

**Backend Format (APIMeal):**
```typescript
{
  Name: "Avocado Toast",
  Restaurant: "Green Kitchen",
  Calorie: 420,
  Ingredients: ["avocado", "bread", "salt"],
  Price: 12,
  Purchase_url: "https://...",
  Image_url: "https://..."
}
```

**Frontend Format (Meal):**
```typescript
{
  id: 1,
  name: "Avocado Toast",
  restaurant: "Green Kitchen", 
  calories: 420,
  image: "https://...",
  price: 12,
  type: "Breakfast"
}
```

## 🎣 React Hook Features

The `useMealPlan` hook provides:

- ✅ Automatic loading states
- ✅ Error handling with user-friendly messages
- ✅ Data caching
- ✅ Retry functionality
- ✅ Auto-fetch on mount (optional)
- ✅ Both raw and formatted data access

## 📦 Integration with Existing App

To integrate with your existing HomeScreen:

```typescript
import { useMealPlan } from '../hooks';
import { useAuth } from '../navigation/AppNavigator';

function HomeScreen() {
  const { userData } = useAuth();
  const { formattedData, loading, fetchMealPlan } = useMealPlan();

  useEffect(() => {
    if (userData) {
      const userID = generateUserID(userData);
      fetchMealPlan(userID);
    }
  }, [userData]);

  // Use formattedData.morning, formattedData.afternoon, etc.
}
```

## 🧪 Testing

Example test for the API handler:

```typescript
import { MealPlanAPI } from '../services';

describe('MealPlanAPI', () => {
  it('should fetch meal plan successfully', async () => {
    const mockResponse = {
      morn: { Name: 'Test Meal', Restaurant: 'Test', Calorie: 300, /* ... */ },
      afternoon: { /* ... */ },
      dinner: { /* ... */ },
      Alt: []
    };

    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await MealPlanAPI.getPlan('test-user');
    expect(result).toEqual(mockResponse);
  });
});
```

## 🚀 Next Steps

1. **Set up your backend endpoint** at `/GetPlan`
2. **Update the base URL** in your environment variables
3. **Test the API** with your actual backend
4. **Integrate into your screens** using the React hook
5. **Add authentication headers** if needed (extend apiClient.ts)

This API handler is production-ready with proper TypeScript support, error handling, and React integration!