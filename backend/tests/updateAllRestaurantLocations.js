require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function updateAllRestaurantLocations() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const mealDbDoc = await MealDatabase.findOne({});
    if (!mealDbDoc || !Array.isArray(mealDbDoc.restaurants)) {
      console.log('No restaurants found in MealDatabase.');
      return;
    }
    mealDbDoc.restaurants.forEach(r => {
      r.location = 'TKO';
    });
    await mealDbDoc.save();
    console.log(`Updated location to 'TKO' for all ${mealDbDoc.restaurants.length} restaurants.`);
  } catch (err) {
    console.error('Error updating restaurant locations:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

updateAllRestaurantLocations();
