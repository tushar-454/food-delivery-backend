const router = require('express').Router();
const { createCategory, getCategories, updateCategory } = require('../../controllers/v1/category');

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.put('/category/:id', updateCategory);

module.exports = router;
