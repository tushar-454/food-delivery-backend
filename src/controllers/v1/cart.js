const {
  createNewCart,
  getAllCarts,
  getCartByProperty,
  updateNewCart,
  deleteACart,
} = require('../../services/v1/cart');

const createCart = async (req, res, next) => {
  const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
  try {
    const { userId, foodId, image, name, price, quantity, total } = req.body;
    if (!regex.test(image)) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const cart = await createNewCart({ userId, foodId, image, name, price, quantity, total });
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

const updateCarts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartExists = await getCartByProperty('_id', id);
    if (!cartExists) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const updatedCart = await updateNewCart(cartExists, quantity);
    if (!updatedCart) {
      return res.status(409).json({ error: 'User bad request' });
    }
    return res.status(200).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartExists = await getCartByProperty('_id', id);
    if (!cartExists) {
      return res.status(400).json({ error: 'User bad request' });
    }
    await deleteACart(id);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCart, getCarts, updateCarts, deleteCart };
