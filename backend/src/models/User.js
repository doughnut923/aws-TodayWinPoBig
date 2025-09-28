const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in query results by default
  },
  
  // Core user profile fields (matching frontend User interface)
  firstName: {
    type: String,
    trim: true,
    maxlength: [30, 'First name cannot exceed 30 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [30, 'Last name cannot exceed 30 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  age: {
    type: Number,
    min: [13, 'Age must be at least 13'],
    max: [120, 'Age cannot exceed 120']
  },
  height: {
    type: Number, // stored in cm for metric, inches for imperial
    min: [50, 'Height must be at least 50'],
    max: [300, 'Height cannot exceed 300']
  },
  weight: {
    type: Number, // stored in kg for metric, lbs for imperial
    min: [20, 'Weight must be at least 20'],
    max: [500, 'Weight cannot exceed 500']
  },
  unit: {
    type: String,
    enum: ['metric', 'imperial'],
    default: 'metric'
  },
  goal: {
    type: String,
    enum: ['weight_loss', 'muscle_gain', 'healthy_eating']
  },
  
  // Extended profile fields for future features
  activityLevel: {
    type: String,
    enum: ['sedentary', 'lightly-active', 'moderately-active', 'very-active', 'extremely-active'],
    default: 'sedentary'
  },
  targetWeight: {
    type: Number, // in same unit as weight
    min: [20, 'Target weight must be at least 20'],
    max: [500, 'Target weight cannot exceed 500']
  },
  
  // Dietary preferences
  dietaryRestrictions: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher', 'keto', 'paleo']
  }],
  preferredCuisines: [{
    type: String,
    enum: ['american', 'asian', 'mediterranean', 'mexican', 'indian', 'italian', 'chinese', 'japanese', 'thai', 'other']
  }],
  mealsPerDay: {
    type: Number,
    min: 1,
    max: 6,
    default: 3
  },
  
  // System fields
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  profileCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Index for email lookup
userSchema.index({ email: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  
  // Update profileCompleted status based on required fields
  this.profileCompleted = this.isProfileComplete();
  
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to check if profile is complete
userSchema.methods.isProfileComplete = function() {
  const required = ['firstName', 'lastName', 'age', 'height', 'weight', 'goal'];
  const missing = required.filter(field => this[field] == null || this[field] === '');
  
  console.log(`Profile completeness check for user ${this.email}:`);
  console.log(`Required fields: ${required.join(', ')}`);
  console.log(`Missing fields: ${missing.join(', ')}`);
  console.log(`Is complete: ${missing.length === 0}`);
  
  return missing.length === 0;
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Virtual for BMI calculation
userSchema.virtual('bmi').get(function() {
  if (this.height && this.weight && this.unit) {
    let heightInMeters, weightInKg;
    
    if (this.unit === 'metric') {
      heightInMeters = this.height / 100; // cm to meters
      weightInKg = this.weight;
    } else {
      heightInMeters = (this.height * 2.54) / 100; // inches to meters
      weightInKg = this.weight * 0.453592; // lbs to kg
    }
    
    return parseFloat((weightInKg / (heightInMeters * heightInMeters)).toFixed(1));
  }
  return null;
});

// Virtual for profile completion percentage
userSchema.virtual('profileCompletionPercentage').get(function() {
  const requiredFields = ['firstName', 'lastName', 'age', 'height', 'weight', 'goal'];
  const completedCount = requiredFields.filter(field => 
    this[field] != null && this[field] !== ''
  ).length;
  
  return Math.round((completedCount / requiredFields.length) * 100);
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
