const router = require('express').Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../../controllers/v1/category');
const { createFood, getFoods, getFoodsByFields } = require('../../controllers/v1/food');

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
router.post('/food', createFood);
router.get('/foods', getFoods);
router.get('/foods/:fields', getFoodsByFields);

module.exports = router;
