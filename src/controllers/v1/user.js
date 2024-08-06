const { getAllCategories } = require('../../services/v1/category');
const { getAllFoods } = require('../../services/v1/food');
const { createNewUser } = require('../../services/v1/user');

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

const createUser = async (req, res, next) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
  try {
    const { name, email, password } = req.body;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'User bad request' });
    }
    // TODO: 'Implement the user find by email service if exists return 409';
    const user = await createNewUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { getCategories, getFoods, createUser };
