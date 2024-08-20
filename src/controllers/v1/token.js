const jwt = require('jsonwebtoken');
const { getUserByProperty } = require('../../services/v1/user');

const createToken = async (req, res, next) => {
  try {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
    const { email } = req.body;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return res
      .status(201)
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
      .json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteToken = async (_req, res, next) => {
  try {
    return res.status(204).clearCookie('token').json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

const doUserLogin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByProperty('email', email);
    if (!user) {
      return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
    return res.status(200).json({
      _id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user?.address,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createToken, deleteToken, doUserLogin };
