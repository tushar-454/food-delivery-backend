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
