const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  try {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com)$/;
    const { role, email } = req.body;
    if ((role !== 'admin' && role !== 'user') || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'User bad request' });
    }
    const token = jwt.sign({ role, email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 1,
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

module.exports = { createToken };
