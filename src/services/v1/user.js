// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const createNewUser = ({ name, email, password }) => {
  bcrypt.hash(password, 10).then((hash) => {
    const newUser = new User({ name, email, password: hash });
    return newUser.save();
  });
};

const getUserByProperty = (property, value) => {
  const user = User.findOne({ [property]: value });
  return user;
};

const updateAUser = (id, updatedFields) => {
  const user = User.findByIdAndUpdate(id, updatedFields, { new: true }).exec();
  return user;
};

const deleteAUser = (id) => {
  const user = User.findByIdAndDelete(id);
  return user;
};

const getAllUsers = () => {
  const users = User.find().select({ password: 0 });
  return users;
};

module.exports = { createNewUser, getUserByProperty, deleteAUser, updateAUser, getAllUsers };
