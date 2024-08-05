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
      return res.status(400).json({ error: 'User bad request' });
    }
    const newCategory = await createNewCategory({ image, name, category });
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
  return null;
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
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
      return res.status(400).json({ error: 'User bad request' });
    }
    const isCategoryExist = await getCategoryByProperty('_id', id);
    if (!isCategoryExist) {
      res.status(400).json({ error: 'User bad request' });
    }
    const updateNewCategory = await updatedCategory({
      id,
      image,
      name,
      category,
    });
    return res.status(200).json(updateNewCategory);
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
      res.status(400).json({ error: 'User bad request' });
    }
    await deleteCategoryById(id);
    res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
