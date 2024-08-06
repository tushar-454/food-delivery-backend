const router = require('express').Router();
const { createToken } = require('../../controllers/v1/token');

router.post('/create', createToken);

module.exports = router;
