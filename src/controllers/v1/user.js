const { getAllCategories } = require('../../services/v1/category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
  return null;
};
module.exports = { getCategories };
