const router = require('express').Router();
const userRoutes = require('./user');
const adminRoutes = require('./admin');
const tokenRoutes = require('./token');
const verifyAdmin = require('../../middleware/verifyAdmin');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', verifyAdmin, adminRoutes);
router.use('/api/v1/token', tokenRoutes);

module.exports = router;
