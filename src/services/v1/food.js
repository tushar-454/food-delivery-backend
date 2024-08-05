const Food = require('../../models/Food');

const newCreateFood = ({ image, name, category, price, description }) => {
  const newFood = new Food({ image, name, category, price, description });
  return newFood.save();
};

const getAllFoods = () => Food.find();

module.exports = { newCreateFood, getAllFoods };
