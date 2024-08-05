const Food = require('../../models/Food');

const newCreateFood = ({ image, name, category, price, description }) => {
  const newFood = new Food({ image, name, category, price, description });
  return newFood.save();
};
module.exports = { newCreateFood };
