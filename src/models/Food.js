const { model, Schema } = require('mongoose');

const foodSchema = new Schema({
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Food = model('Food', foodSchema);
module.exports = Food;
