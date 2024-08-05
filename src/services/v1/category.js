const Category = require('../../models/Category');

const createNewCategory = async ({ image, name, category }) => {
  const newCategory = await new Category({ image, name, category: category.toLowerCase() });
  await newCategory.save();
  return newCategory;
};

module.exports = { createNewCategory };
