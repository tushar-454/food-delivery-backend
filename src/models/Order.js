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
        name: {
          type: String,
          required: [true, 'Name is required'],
          trim: true,
        },
        price: {
          type: Number,
          required: [true, 'Price is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
        },
        discount: {
          type: Number,
          required: [true, 'Discount is required'],
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
    enum: ['canceled', 'pending', 'processing', 'ofd', 'delivered'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID  is required'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
