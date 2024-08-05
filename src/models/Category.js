const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
});

const Category = model('Category', categorySchema);
module.exports = Category;
