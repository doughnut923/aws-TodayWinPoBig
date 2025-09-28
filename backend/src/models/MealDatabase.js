const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: Number,
  start_time: Number,
  end_time: Number,
  image: String,
  calories: Number,
  carbohydrates: Number,
  protein: Number,
  is_vegetarian: Boolean,
  tags: [String],
  health_tags: [String]
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
  restaurant_id: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
  items: [mealItemSchema]
}, { _id: false });

const mealDatabaseSchema = new mongoose.Schema({
  restaurants: [restaurantSchema]
});

module.exports = mongoose.model('MealDatabase', mealDatabaseSchema);