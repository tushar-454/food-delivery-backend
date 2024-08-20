const {
  createNewCart,
  getAllCarts,
  getCartByProperty,
  updateNewCart,
  deleteACart,
  deleteCartsByIds,
} = require('../../services/v1/cart');
const { getUserByProperty } = require('../../services/v1/user');

const createCart = async (req, res, next) => {
  const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/;
  try {
    const { userId, foodId, image, name, price, quantity, total } = req.body;
    if (!regex.test(image)) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const cart = await createNewCart({ userId, foodId, image, name, price, quantity, total });
    return res.status(201).json({ status: 201, cart });
  } catch (error) {
    next(error);
  }
  return null;
};

const getCarts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByProperty('_id', id);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const carts = await getAllCarts(id);
    return res.status(200).json({ status: 200, carts });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateCarts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartExists = await getCartByProperty('_id', id);
    if (!cartExists) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const updatedCart = await updateNewCart(cartExists, quantity);
    if (!updatedCart) {
      return res.status(409).json({ status: 409, error: 'Bad request: Invalid input data.' });
    }
    return res.status(200).json({ status: 200, updatedCart });
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
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    await deleteACart(id);
    return res.status(200).json({ status: 200 });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteCarts = async (req, res, next) => {
  try {
    const { ids } = req.query;
    await deleteCartsByIds(ids);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCart, getCarts, updateCarts, deleteCart, deleteCarts };
