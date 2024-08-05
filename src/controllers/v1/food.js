const { newCreateFood } = require('../../services/v1/food');

const createFood = async (req, res, next) => {
  try {
    const { image, name, category, price, description } = req.body;
    if (!image || !name || !category || !price || !description) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const newFood = await newCreateFood({ image, name, category, price, description });
    return res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createFood };
