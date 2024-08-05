const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  orderItems: {
    type: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: 'Food',
          required: [true, 'Food is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
        },
      },
    ],
    required: [true, 'Order items are required'],
  },
  total: {
    type: Number,
    required: [true, 'Total is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'foodProcessing', 'ofd', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
