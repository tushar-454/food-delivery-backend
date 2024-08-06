const router = require('express').Router();
const { getCategories, getFoods, createUser, getUser } = require('../../controllers/v1/user');
const { createCart, getCarts, updateCarts } = require('../../controllers/v1/cart');

router.post('/', createUser);
router.get('/:email', getUser);
router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.post('/cart', createCart);
router.get('/carts/:id', getCarts);
router.put('/cart/:id', updateCarts);

module.exports = router;
