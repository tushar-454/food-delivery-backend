const router = require('express').Router();
const userRoutes = require('./user');
const adminRoutes = require('./admin');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', adminRoutes);

module.exports = router;
