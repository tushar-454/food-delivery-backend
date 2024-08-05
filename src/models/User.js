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
  address: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    zip: {
      type: String,
      required: [true, 'Zip is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    place: {
      type: String,
      required: [true, 'Place is required'],
    },
  },
});

const User = model('User', userSchema);
module.exports = User;
