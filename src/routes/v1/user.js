const router = require('express').Router();
const { getCategories, getFoods } = require('../../controllers/v1/user');
const { createCart } = require('../../controllers/v1/cart');

router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.post('/cart', createCart);

module.exports = router;
