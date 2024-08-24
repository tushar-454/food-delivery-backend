const Order = require('../../models/Order');

const createNewOrder = async ({ userId, foodItem, total, transactionId }) => {
  const order = await new Order({
    userId,
    orderItems: foodItem,
    total: total.toFixed(2),
    transactionId,
  });
  return order.save();
};

const getAllOrders = async (userId) => {
  if (userId) {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders;
  }
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'address _id role name email phone');
  return orders;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  return order;
};

module.exports = { createNewOrder, getAllOrders, updateOrderStatus };
