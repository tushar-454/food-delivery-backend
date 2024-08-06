const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  try {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
    const { email } = req.body;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 5,
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

const deleteToken = async (req, res, next) => {
  try {
    return res.status(204).clearCookie('token').json(null);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createToken, deleteToken };
