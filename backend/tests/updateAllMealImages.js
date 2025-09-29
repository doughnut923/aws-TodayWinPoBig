require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

const NEW_IMAGE_URL = 'https://img.freepik.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg';

async function updateAllMealImages() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const mealDbDoc = await MealDatabase.findOne({});
    if (!mealDbDoc || !Array.isArray(mealDbDoc.restaurants)) {
      console.log('No restaurants found in MealDatabase.');
      return;
    }
    let mealCount = 0;
    mealDbDoc.restaurants.forEach(r => {
      if (Array.isArray(r.items)) {
        r.items.forEach(item => {
          item.image = NEW_IMAGE_URL;
          mealCount++;
        });
      }
    });
    await mealDbDoc.save();
    console.log(`Updated image for ${mealCount} meals in all restaurants.`);
  } catch (err) {
    console.error('Error updating meal images:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

updateAllMealImages();
