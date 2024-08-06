const router = require('express').Router();
const { getCategories, getFoods } = require('../../controllers/v1/user');
const { createCart, getCarts } = require('../../controllers/v1/cart');

router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.post('/cart', createCart);
router.get('/carts/:id', getCarts);

module.exports = router;
