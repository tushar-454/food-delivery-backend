const Order = require('../../models/Order');

const createNewOrder = async ({ userId, foodItem, total }) => {
  const order = new Order({
    userId,
    orderItems: foodItem,
    total: total.toFixed(2),
  });
  return order.save();
};

module.exports = { createNewOrder };
