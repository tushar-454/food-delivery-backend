const Cart = require('../../models/Cart');

const createNewCart = ({ userId, image, name, price, quantity, total }) => {
  const cart = new Cart({ userId, image, name, price, quantity, total });
  return cart.save();
};

const getAllCarts = (id) => {
  const userCarts = Cart.find({ userId: id }).populate('userId');
  return userCarts;
};

module.exports = { createNewCart, getAllCarts };
