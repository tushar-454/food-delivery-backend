const { createNewCart } = require('../../services/v1/cart');

const createCart = async (req, res, next) => {
  try {
    const { userId, foodId, quantity, total } = req.body;
    const cart = await createNewCart({ userId, foodId, quantity, total });
    return res.status(201).json(cart);
  } catch (error) {
    next();
  }
  return null;
};

module.exports = { createCart };
