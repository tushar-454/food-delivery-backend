const router = require('express').Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../../controllers/v1/category');
const {
  createFood,
  getFoods,
  getFoodsByFields,
  getFood,
  updateFood,
  deleteFood,
  deleteFoods,
} = require('../../controllers/v1/food');
const { getOrdersAdmin, updateOrderAdmin } = require('../../controllers/v1/order');
const { getUsers, updateUserAdmin, deleteUserAdmin } = require('../../controllers/v1/user');

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
router.post('/food', createFood);
router.get('/foods', getFoods);
router.get('/foods/:fields', getFoodsByFields);
router.get('/food/:id', getFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);
router.delete('/foods/:id', deleteFoods);
router.get('/users', getUsers);
router.put('/user/:id', updateUserAdmin);
router.delete('/user/:id', deleteUserAdmin);
router.get('/orders', getOrdersAdmin);
router.put('/order/:orderId', updateOrderAdmin);

module.exports = router;
