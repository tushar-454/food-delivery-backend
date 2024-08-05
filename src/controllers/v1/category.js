const { createNewCategory, getAllCategories } = require('../../services/v1/category');

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

module.exports = { createCategory, getCategories };
