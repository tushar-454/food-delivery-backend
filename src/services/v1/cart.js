const Cart = require('../../models/Cart');

const createNewCart = async ({ userId, foodId, image, name, price, quantity, total }) => {
  const cart = await new Cart({ userId, foodId, image, name, price, quantity, total });
  return cart.save();
};

const getAllCarts = async (id) => {
  const userCarts = await Cart.find({ userId: id });
  return userCarts;
};

const getCartByProperty = async (property, value) => {
  const cart = await Cart.findOne({ [property]: value });
  return cart;
};

const updateNewCart = async (cartItem, quantity) => {
  if (quantity) {
    const updatedCart = await Cart.findByIdAndUpdate(cartItem.id, {
      quantity: parseInt(quantity, 10),
      total: parseInt(quantity, 10) * cartItem.price,
    });
    return updatedCart;
  }
  return null;
};

const deleteACart = async (id) => {
  const cart = await Cart.findByIdAndDelete(id);
  return cart;
};

module.exports = { createNewCart, getAllCarts, getCartByProperty, updateNewCart, deleteACart };
