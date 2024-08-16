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
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
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
  total: {
    type: Number,
    required: [true, 'Total is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = model('Cart', cartSchema);
module.exports = Cart;
