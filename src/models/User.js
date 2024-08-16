const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlangth: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
  },
});

const User = model('User', userSchema);
module.exports = User;
