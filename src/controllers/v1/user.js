const { getAllCategories } = require('../../services/v1/category');
const { getAllFoods } = require('../../services/v1/food');

const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
  return null;
};

const getFoods = async (req, res, next) => {
  try {
    const foods = await getAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { getCategories, getFoods };
