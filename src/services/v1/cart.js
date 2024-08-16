const Cart = require('../../models/Cart');

const createNewCart = ({ userId, foodId, image, name, price, quantity, total }) => {
  const cart = new Cart({ userId, foodId, image, name, price, quantity, total });
  return cart.save();
};

const getAllCarts = (id) => {
  const userCarts = Cart.find({ userId: id });
  return userCarts;
};

const getCartByProperty = (property, value) => {
  const cart = Cart.findOne({ [property]: value });
  return cart;
};

const updateNewCart = (cartItem, quantity) => {
  if (quantity) {
    const updatedCart = Cart.findByIdAndUpdate(cartItem.id, {
      quantity: parseInt(quantity, 10),
      total: parseInt(quantity, 10) * cartItem.price,
    });
    return updatedCart;
  }
  return null;
};

const deleteACart = (id) => {
  const cart = Cart.findByIdAndDelete(id);
  return cart;
};

module.exports = { createNewCart, getAllCarts, getCartByProperty, updateNewCart, deleteACart };
