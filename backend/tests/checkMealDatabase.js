require('dotenv').config();
const mongoose = require('mongoose');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function checkData() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const data = await MealDatabase.find({});
    if (data.length === 0) {
      console.log('No data found in MealDatabase collection.');
    } else {
      // Assuming only one document as per your import script
      const restaurants = data[0].restaurants || [];
      console.log(`Number of restaurants: ${restaurants.length}`);
      let totalItems = 0;
      restaurants.forEach((rest, idx) => {
        const numItems = rest.items ? rest.items.length : 0;
        totalItems += numItems;
        console.log(`  ${idx + 1}. ${rest.name} (ID: ${rest.restaurant_id || 'N/A'}) - ${numItems} items`);
      });
      console.log(`Total menu items: ${totalItems}`);
    }
  } catch (err) {
    console.error('Error checking data:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

checkData();
