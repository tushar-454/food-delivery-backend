const jwt = require('jsonwebtoken');
const { getUserByProperty } = require('../services/v1/user');

const verifyAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await getUserByProperty('email', decoded.email);
    if (!userExists) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (userExists.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = userExists;
    return next();
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = verifyAdmin;
