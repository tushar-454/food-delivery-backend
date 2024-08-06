const router = require('express').Router();
const {
  getCategories,
  getFoods,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../../controllers/v1/user');
const { createCart, getCarts, updateCarts, deleteCart } = require('../../controllers/v1/cart');
const { createOrder, getOrders } = require('../../controllers/v1/order');

router.post('/', createUser);
router.get('/:email', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.post('/cart', createCart);
router.get('/carts/:id', getCarts);
router.put('/cart/:id', updateCarts);
router.delete('/cart/:id', deleteCart);
router.post('/order', createOrder);
router.get('/orders/:userId', getOrders);

module.exports = router;
