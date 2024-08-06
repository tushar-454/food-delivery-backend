const Cart = require('../../models/Cart');

const createNewCart = ({ userId, foodId, quantity, total }) => {
  const cart = new Cart({ userId, foodId, quantity, total });
  return cart.save();
};

module.exports = { createNewCart };
