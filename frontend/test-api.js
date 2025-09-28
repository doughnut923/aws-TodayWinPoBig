// Simple test script to verify meal plan API
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function testMealPlanAPI() {
  try {
    console.log('Testing meal plan API...');
    
    const response = await axios.post(`${API_BASE_URL}/GetPlan`, {
      UserID: 'test-user-123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', JSON.stringify(response.data, null, 2));
    
    // Test the structure
    const data = response.data;
    if (data.morn && data.afternoon && data.dinner && Array.isArray(data.Alt)) {
      console.log('✅ API response has correct structure');
      console.log(`✅ Contains ${data.Alt.length} alternatives`);
    } else {
      console.log('❌ API response structure is invalid');
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testMealPlanAPI();
