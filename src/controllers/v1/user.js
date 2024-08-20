const bcrypt = require('bcrypt');
const { getAllCategories } = require('../../services/v1/category');
const { getAllFoods } = require('../../services/v1/food');
const {
  createNewUser,
  getUserByProperty,
  deleteAUser,
  updateAUser,
  getAllUsers,
} = require('../../services/v1/user');

const getCategories = async (_req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ status: 200, categories });
  } catch (error) {
    next(error);
  }
  return null;
};

const getFoods = async (req, res, next) => {
  try {
    const { category } = req.query;
    const foods = await getAllFoods(category);
    res.status(200).json({ status: 200, foods });
  } catch (error) {
    next(error);
  }
  return null;
};

const createUser = async (req, res, next) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
  try {
    const { name, email, password } = req.body;
    const userExists = await getUserByProperty('email', email);
    if (!emailRegex.test(email) || !!userExists) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    // TODO: 'Implement the user find by email service if exists return 409';
    const user = await createNewUser({ name, email, password });
    return res.status(201).json({ status: 201, user });
  } catch (error) {
    next(error);
  }
  return null;
};

const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getUserByProperty('email', email);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    return res.status(200).json({ status: 200, user });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, street, city, zip, country, place, state, phone } = req.body;
    const user = await getUserByProperty('_id', id);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const updatedFields = { name, phone, address: { street, city, zip, country, place, state } };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      updatedFields.password = hash;
    }
    const updatedUser = await updateAUser(id, updatedFields);
    return res.status(200).json({ status: 200, user: updatedUser });
  } catch (error) {
    next(error);
  }

  return null;
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByProperty('_id', id);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    await deleteAUser(id);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ status: 200, users });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { role } = req.body;
    role = role.toLowerCase();
    const user = await getUserByProperty('_id', id);
    if (!user || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const updatedUser = await updateAUser(id, { role });
    return res.status(200).json({ status: 200, user: updatedUser });
  } catch (error) {
    next(error);
  }

  return null;
};

const deleteUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByProperty('_id', id);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    await deleteAUser(id);
    return res.status(204).json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByProperty('email', email);
    if (!user) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    return res.status(200).json({
      _id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      address: user?.address,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = {
  getCategories,
  getFoods,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUsers,
  updateUserAdmin,
  deleteUserAdmin,
  loginUser,
};
