const Food = require('../../models/Food');

const newCreateFood = async ({ image, name, category, price, description }) => {
  const newFood = await new Food({ image, name, category, price, description });
  return newFood.save();
};

const getAllFoods = async (category) => {
  if (category) {
    const foods = await Food.find({ category });
    return foods;
  }
  const foods = await Food.find();
  return foods;
};

const getAllFoodsByFields = async (fields) => {
  const fieldsParams = fields;
  const fieldsArr = fieldsParams.split(',');
  const projectionFields = {};
  fieldsArr.forEach((field) => {
    projectionFields[field] = 1;
  });
  const foods = await Food.find().select(projectionFields);
  return foods;
};

const getFoodByProperty = async (property, value) => {
  const food = await Food.findOne({ [property || 'name']: value });
  return food;
};

const newUpdatedFood = async ({ id, image, name, category, price, description }) => {
  const updatedFood = await Food.findByIdAndUpdate(
    id,
    { image, name, category, price, description },
    { new: true, runValidators: true },
  )
    .then((up) => {
      if (up) {
        return up;
      }
      return { status: 500, error: 'Internal server error' };
    })
    .catch((error) => error);
  return updatedFood;
};

const deleteFoodById = async (id) => {
  const food = await Food.findByIdAndDelete(id);
  return food;
};

const deleteFoodsById = async (id) => {
  const ids = id.split(',');
  const deleteFoods = await Food.deleteMany({ _id: { $in: ids } });
  return deleteFoods;
};

const getFoodByIds = async (foodsItems) => {
  const foodsIds = foodsItems.map((food) => food.foodId);
  const foods = await Food.find({ _id: { $in: foodsIds } }).select({
    name: 1,
    price: 1,
    discount: 1,
    isAvailable: 1,
  });
  return foods;
};

const getSearchFoodsByValue = async ({ categoryStr, minimum, maximun }) => {
  const min = parseInt(minimum, 10);
  const max = parseInt(maximun, 10);
  const category = categoryStr && categoryStr.split(',');
  let propagation = {};
  if (category) {
    propagation = { category: { $in: category } };
  }
  if (min && max) {
    propagation.price = { $gte: min, $lte: max };
  }
  if (min && max && category) {
    propagation = { category: { $in: category }, price: { $gte: min, $lte: max } };
  }
  if (min && !max) {
    propagation.price = { $gte: min };
  }
  if (!min && max) {
    propagation.price = { $gte: 0, $lte: max };
  }
  if (min && !max && category) {
    propagation = { category: { $in: category }, price: { $gte: min } };
  }
  if (!min && max && category) {
    propagation = { category: { $in: category }, price: { $lte: max } };
  }
  const foods = await Food.aggregate([{ $match: propagation }, { $sort: { price: 1 } }]);
  return foods;
};

module.exports = {
  newCreateFood,
  getAllFoods,
  getAllFoodsByFields,
  getFoodByProperty,
  newUpdatedFood,
  deleteFoodById,
  deleteFoodsById,
  getFoodByIds,
  getSearchFoodsByValue,
};
