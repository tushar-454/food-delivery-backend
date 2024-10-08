const router = require('express').Router();
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const tokenRoutes = require('./token');
const paymentRoutes = require('./payment');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyUser = require('../../middleware/verifyUser');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', verifyAdmin, adminRoutes);
router.use('/api/v1/token', tokenRoutes);
router.use('/api/v1/payment', verifyUser, paymentRoutes);

module.exports = router;
