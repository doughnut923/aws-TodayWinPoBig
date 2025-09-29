require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function showRestaurantLocations() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const mealDbDoc = await MealDatabase.findOne({});
    if (!mealDbDoc || !Array.isArray(mealDbDoc.restaurants)) {
      console.log('No restaurants found in MealDatabase.');
      return;
    }
    const locations = mealDbDoc.restaurants.map(r => ({
      name: r.name,
      location: r.location || 'N/A',
      id: r.restaurant_id || 'N/A'
    }));
    console.log(`Number of restaurants: ${locations.length}`);
    locations.forEach((rest, idx) => {
      console.log(`${idx + 1}. ${rest.name} (ID: ${rest.id}) - Location: ${rest.location}`);
    });
  } catch (err) {
    console.error('Error fetching restaurant locations:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

showRestaurantLocations();
