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
  User.findByIdAndUpdate(id, updatedFields, { new: true }).exec();
};

const deleteAUser = (id) => {
  const user = User.findByIdAndDelete(id);
  return user;
};

module.exports = { createNewUser, getUserByProperty, deleteAUser, updateAUser };
