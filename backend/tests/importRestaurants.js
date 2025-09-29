require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const MealDatabase = require('../src/models/MealDatabase');
const dbUrl = process.env.MONGODB_URI;

async function importData() {
  try {
    console.log(dbUrl);
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Read and parse the JSON file
    const dataPath = path.join(__dirname, 'database.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    // Remove existing data (optional, comment out if you want to keep old data)
    await MealDatabase.deleteMany({});

    // Insert the new data
    const mealDb = new MealDatabase(jsonData);
    await mealDb.save();
    console.log('Data imported successfully!');
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

importData();
