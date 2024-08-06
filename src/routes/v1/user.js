const router = require('express').Router();
const { getCategories, getFoods, createUser, getUser } = require('../../controllers/v1/user');
const { createCart, getCarts } = require('../../controllers/v1/cart');

router.post('/', createUser);
router.get('/:email', getUser);
router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.post('/cart', createCart);
router.get('/carts/:id', getCarts);

module.exports = router;
