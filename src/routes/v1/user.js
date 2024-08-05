const router = require('express').Router();
const { getCategories } = require('../../controllers/v1/user');

router.get('/categories', getCategories);

module.exports = router;
