const { getFoodByIds } = require('../../services/v1/food');
const { createNewOrder, getAllOrders, updateOrderStatus } = require('../../services/v1/order');

const createOrder = async (req, res, next) => {
  try {
    const { userId, foodsItems, deliveryFee } = req.body;
    const food = await getFoodByIds(foodsItems);
    if (!food || food.length === 0) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
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
    const order = await createNewOrder({ userId, foodItem, total: total + deliveryFee });
    return res.status(201).json({ status: 201, order });
  } catch (error) {
    next(error);
  }
  return null;
};

const getOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await getAllOrders(userId);
    return res.status(200).json({ status: 200, orders });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (status !== 'canceled') {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const order = await updateOrderStatus(orderId, status);
    return res.status(200).json({ status: 200, order });
  } catch (error) {
    next(error);
  }
  return null;
};

const getOrdersAdmin = async (_req, res, next) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json({ status: 200, orders });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateOrderAdmin = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (
      status !== 'canceled' &&
      status !== 'pending' &&
      status !== 'processing' &&
      status !== 'ofd' &&
      status !== 'delivered'
    ) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const order = await updateOrderStatus(orderId, status);
    return res.status(200).json({ status: 200, order });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createOrder, getOrders, updateOrder, getOrdersAdmin, updateOrderAdmin };
