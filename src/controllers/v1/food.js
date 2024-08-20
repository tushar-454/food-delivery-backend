const {
  newCreateFood,
  getAllFoods,
  getAllFoodsByFields,
  getFoodByProperty,
  newUpdatedFood,
  deleteFoodById,
  deleteFoodsById,
} = require('../../services/v1/food');

const createFood = async (req, res, next) => {
  try {
    const { image, name, category, price, description } = req.body;
    if (!image || !name || !category || !price || !description) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const newFood = await newCreateFood({ image, name, category, price, description });
    return res.status(201).json({ status: 201, food: newFood });
  } catch (error) {
    next(error);
  }
  return null;
};

const getFoods = async (_req, res, next) => {
  try {
    const foods = await getAllFoods();
    return res.status(200).json({ status: 200, foods });
  } catch (error) {
    next(error);
  }
  return null;
};

const getFoodsByFields = async (req, res, next) => {
  try {
    const { fields } = req.params;
    const foods = await getAllFoodsByFields(fields);
    return res.status(200).json({ status: 200, foods });
  } catch (error) {
    next(error);
  }
  return null;
};

const getFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await getFoodByProperty('_id', id);
    if (!food) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    res.status(200).json({ status: 200, food });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateFood = async (req, res, next) => {
  const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
  try {
    const { id } = req.params;
    const { image, name, category, price, description } = req.body;
    const isFoodExist = await getFoodByProperty('_id', id);
    if (!regex.test(image) || !isFoodExist) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const updatedFood = await newUpdatedFood({ id, image, name, category, price, description });
    return res.status(200).json({ status: 200, food: updatedFood });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isFoodExist = await getFoodByProperty('_id', id);
    if (!isFoodExist) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    await deleteFoodById(id);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteFoods = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteFoodsById(id);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = {
  createFood,
  getFoods,
  getFoodsByFields,
  getFood,
  updateFood,
  deleteFood,
  deleteFoods,
};
