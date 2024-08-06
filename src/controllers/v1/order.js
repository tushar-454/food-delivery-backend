const { getFoodByIds } = require('../../services/v1/food');
const { createNewOrder } = require('../../services/v1/order');

const createOrder = async (req, res, next) => {
  try {
    const { userId, foodsItems } = req.body;
    const food = await getFoodByIds(foodsItems);
    if (!food || food.length === 0) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const foodItem = foodsItems.map((fItem) => {
      const foodData = food.find((f) => f.id === fItem.foodId);
      return {
        name: foodData.name,
        price: foodData.price,
        quantity: fItem.quantity,
        discount: foodData.discount,
      };
    });
    const total = foodItem.reduce((acc, curr) => {
      if (curr.discount !== 0 || curr.discount < 0) {
        return acc + (curr.price - (curr.price * curr.discount) / 100) * curr.quantity;
      }
      return acc + curr.price * curr.quantity;
    }, 0);
    const order = createNewOrder({ userId, foodItem, total });
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createOrder };
