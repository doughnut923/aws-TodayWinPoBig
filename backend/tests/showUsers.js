require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

async function showUsers() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const users = await User.find({}).lean();
    if (users.length === 0) {
      console.log('No users found in User collection.');
    } else {
      console.log(`Number of users: ${users.length}`);
      users.forEach((user, idx) => {
        console.log(`\nUser #${idx + 1}`);
        console.log(`  UserId (_id): ${user._id}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Name: ${user.firstName || ''} ${user.lastName || ''}`);
        console.log(`  Location: ${user.location || 'N/A'}`);
        console.log(`  Age: ${user.age || 'N/A'}`);
        console.log(`  Goal: ${user.goal || 'N/A'}`);
        console.log(`  Profile Completed: ${user.profileCompleted ? 'Yes' : 'No'}`);
        console.log(`  Profile Completion: ${user.profileCompletionPercentage || 0}%`);
        console.log(`  Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}`);
      });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

showUsers();
