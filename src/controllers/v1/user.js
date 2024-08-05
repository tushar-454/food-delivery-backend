const getUserByEmail = async (req, res) => {
  res.status(200).json({ message: 'User found' });
};
module.exports = { getUserByEmail };
