const Category = require('../../models/Category');

const createNewCategory = async ({ image, name, category }) => {
  const newCategory = await new Category({ image, name, category: category.toLowerCase() });
  await newCategory.save();
  return newCategory;
};

const getAllCategories = () => Category.find();

const getCategoryByProperty = (property, value) => {
  const category = Category.findOne({ [property || 'name']: value });
  return category;
};

const updatedCategory = ({ id, image, name, category }) => {
  const updateCategory = Category.findByIdAndUpdate(
    id,
    { image, name, category },
    { new: true, runValidators: true },
  )
    .then((up) => {
      if (up) {
        return up;
      }
      return { error: 'User bad request' };
    })
    .catch((error) => error);
  return updateCategory;
};

module.exports = { createNewCategory, getAllCategories, updatedCategory, getCategoryByProperty };
