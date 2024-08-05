const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  foodId: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
    required: [true, 'Food is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
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

const Cart = model('Cart', cartSchema);
module.exports = Cart;
