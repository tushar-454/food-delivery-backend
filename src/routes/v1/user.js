const router = require('express').Router();
const { getCategories, getFoods } = require('../../controllers/v1/user');

router.get('/categories', getCategories);
router.get('/foods', getFoods);

module.exports = router;
