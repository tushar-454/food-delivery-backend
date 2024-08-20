// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const createNewUser = async ({ name, email, password }) => {
  bcrypt.hash(password, 10).then(async (hash) => {
    const newUser = await new User({ name, email, password: hash });
    return newUser.save();
  });
};

const getUserByProperty = async (property, value) => {
  const user = await User.findOne({ [property]: value });
  return user;
};

const updateAUser = async (id, updatedFields) => {
  const user = await User.findByIdAndUpdate(id, updatedFields, { new: true }).exec();
  return user;
};

const deleteAUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find().select({ password: 0 });
  return users;
};

module.exports = { createNewUser, getUserByProperty, deleteAUser, updateAUser, getAllUsers };
