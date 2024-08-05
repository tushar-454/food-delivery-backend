const Category = require('../../models/Category');

const createNewCategory = async ({ image, name, category }) => {
  const newCategory = await new Category({ image, name, category: category.toLowerCase() });
  await newCategory.save();
  return newCategory;
};

const getAllCategories = () => Category.find();

module.exports = { createNewCategory, getAllCategories };
