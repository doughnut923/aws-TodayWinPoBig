require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function fetchAllMealIds() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const mealDbDoc = await MealDatabase.findOne({});
    if (!mealDbDoc || !Array.isArray(mealDbDoc.restaurants)) {
      console.log('No restaurants found in MealDatabase.');
      return;
    }
    const mealIds = [];
    mealDbDoc.restaurants.forEach(r => {
      if (Array.isArray(r.items)) {
        r.items.forEach(item => {
          if (item.id) {
            mealIds.push(item.id);
          }
        });
      }
    });
    console.log(`Total meals with id: ${mealIds.length}`);
    console.log(mealIds);
  } catch (err) {
    console.error('Error fetching meal ids:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

fetchAllMealIds();
