const router = require('express').Router();
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const tokenRoutes = require('./token');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', adminRoutes);
router.use('/api/v1/token', tokenRoutes);

module.exports = router;
