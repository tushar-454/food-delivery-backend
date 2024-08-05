const Food = require('../../models/Food');

const newCreateFood = ({ image, name, category, price, description }) => {
  const newFood = new Food({ image, name, category, price, description });
  return newFood.save();
};

const getAllFoods = () => Food.find();

const getAllFoodsByFields = (fields) => {
  const fieldsParams = fields;
  const fieldsArr = fieldsParams.split(',');
  const projectionFields = {};
  fieldsArr.forEach((field) => {
    projectionFields[field] = 1;
  });
  return Food.find().select(projectionFields);
};

const getFoodByProperty = (property, value) => {
  const food = Food.findOne({ [property || 'name']: value });
  return food;
};

module.exports = { newCreateFood, getAllFoods, getAllFoodsByFields, getFoodByProperty };
