const router = require('express').Router();
const {
  getCategories,
  getFoods,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../../controllers/v1/user');
const {
  createCart,
  getCarts,
  updateCarts,
  deleteCart,
  deleteCarts,
} = require('../../controllers/v1/cart');
const { createOrder, getOrders, updateOrder } = require('../../controllers/v1/order');
const verifyUser = require('../../middleware/verifyUser');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.get('/:email', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/carts', verifyUser, deleteCarts);
router.delete('/:id', verifyUser, deleteUser);
router.post('/cart', verifyUser, createCart);
router.get('/carts/:id', verifyUser, getCarts);
router.put('/cart/:id', verifyUser, updateCarts);
router.delete('/cart/:id', verifyUser, deleteCart);
router.post('/order', verifyUser, createOrder);
router.get('/orders/:userId', verifyUser, getOrders);
router.put('/order/:orderId', verifyUser, updateOrder);

module.exports = router;
