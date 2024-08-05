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
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
});

const Category = model('Category', categorySchema);
module.exports = Category;
