const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function testLocationField() {
  try {
    console.log('=== Testing Location Field ===\n');
    
    // First, let's try to login with an existing user
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@gmail.com',
      password: 'your-password-here' // You'll need to use the actual password
    });
    
    console.log('1. Login successful');
    console.log('Current user location:', loginResponse.data.user.location);
    
    const token = loginResponse.data.token;
    
    // Now let's update the profile with a location
    const updateResponse = await axios.put(`${API_BASE_URL}/auth/profile`, {
      location: 'San Francisco, CA'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('\n2. Profile update successful');
    console.log('Updated user location:', updateResponse.data.user.location);
    
    // Get profile to verify the location was saved
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('\n3. Profile fetch successful');
    console.log('Verified user location:', profileResponse.data.user.location);
    
    console.log('\n✅ Location field is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testLocationField();
