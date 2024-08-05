const router = require('express').Router();
const { getUserByEmail } = require('../../controllers/v1/user');

router.get('/', getUserByEmail);

module.exports = router;
