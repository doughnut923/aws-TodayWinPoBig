require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function updateAllLocations() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const result = await User.updateMany({}, { $set: { location: 'TKO' } });
    console.log(`Updated ${result.modifiedCount || result.nModified || 0} users' location to 'TKO'.`);
  } catch (err) {
    console.error('Error updating users:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

updateAllLocations();
