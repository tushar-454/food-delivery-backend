const Category = require('../../models/Category');

const createNewCategory = async ({ image, name, category }) => {
  const newCategory = await new Category({ image, name, category: category.toLowerCase() });
  await newCategory.save();
  return newCategory;
};

const getAllCategories = (fields) => {
  if (!fields) {
    return Category.find();
  }
  const fieldsArr = fields.split(',');
  const categories = Category.find({}, fieldsArr);
  return categories;
};

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
      return { status: 500, error: 'Internal server error' };
    })
    .catch((error) => error);
  return updateCategory;
};

const deleteCategoryById = (id) => {
  Category.findByIdAndDelete(id)
    .then((del) => {
      if (del) {
        return del;
      }
      return { status: 500, error: 'Internal server error' };
    })
    .catch((error) => error);
};

module.exports = {
  createNewCategory,
  getAllCategories,
  updatedCategory,
  getCategoryByProperty,
  deleteCategoryById,
};
