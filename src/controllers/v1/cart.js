const { createNewCart, getAllCarts } = require('../../services/v1/cart');

const createCart = async (req, res, next) => {
  const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
  try {
    const { userId, image, name, price, quantity, total } = req.body;
    if (!regex.test(image)) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const cart = await createNewCart({ userId, image, name, price, quantity, total });
    return res.status(201).json(cart);
  } catch (error) {
    next();
  }
  return null;
};

const getCarts = async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: 'Implement the user find by id service'
    const carts = await getAllCarts(id);
    return res.status(200).json(carts);
  } catch (error) {
    next();
  }
  return null;
};

module.exports = { createCart, getCarts };
