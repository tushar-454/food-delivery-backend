const {
  createNewCategory,
  getAllCategories,
  updatedCategory,
  getCategoryByProperty,
  deleteCategoryById,
} = require('../../services/v1/category');

const createCategory = async (req, res, next) => {
  try {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
    const { image, name, category } = req.body;
    if (!regex.test(image) || !name || !category) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const newCategory = await createNewCategory({ image, name, category });
    return res.status(201).json({ status: 201, category: newCategory });
  } catch (error) {
    next(error);
  }
  return null;
};

const getCategories = async (req, res, next) => {
  try {
    const { fields } = req.query;
    const categories = await getAllCategories(fields);
    return res.status(200).json({ status: 200, categories });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateCategory = async (req, res, next) => {
  try {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
    const { id } = req.params;
    const { image, name, category } = req.body;
    if (image && !regex.test(image)) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const isCategoryExist = await getCategoryByProperty('_id', id);
    if (!isCategoryExist) {
      res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const updateNewCategory = await updatedCategory({
      id,
      image,
      name,
      category,
    });
    return res.status(200).json({ status: 200, category: updateNewCategory });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isCategoryExist = await getCategoryByProperty('_id', id);
    if (!isCategoryExist) {
      res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    await deleteCategoryById(id);
    res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
