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

const updateOrderStatus = (orderId, status) => {
  const order = Order.findByIdAndUpdate(orderId, { status }, { new: true });
  return order;
};

module.exports = { createNewOrder, getAllOrders, updateOrderStatus };
