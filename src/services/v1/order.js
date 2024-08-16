const Order = require('../../models/Order');

const createNewOrder = async ({ userId, foodItem, total }) => {
  const order = new Order({
    userId,
    orderItems: foodItem,
    total: total.toFixed(2),
  });
  return order.save();
};

const getAllOrders = (userId) => {
  if (userId) {
    return Order.find({ userId }).sort({ createdAt: -1 });
  }
  return Order.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'address _id role name email phone');
};

const updateOrderStatus = (orderId, status) => {
  const order = Order.findByIdAndUpdate(orderId, { status }, { new: true });
  return order;
};

module.exports = { createNewOrder, getAllOrders, updateOrderStatus };
