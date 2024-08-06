const Order = require('../../models/Order');

const createNewOrder = async ({ userId, foodItem, total }) => {
  const order = new Order({
    userId,
    orderItems: foodItem,
    total: total.toFixed(2),
  });
  return order.save();
};

const getAllOrders = (userId) => Order.find({ userId }).sort({ createdAt: -1 });

module.exports = { createNewOrder, getAllOrders };
