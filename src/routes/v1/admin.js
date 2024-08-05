const router = require('express').Router();
const { createCategory, getCategories } = require('../../controllers/v1/category');

router.post('/category', createCategory);
router.get('/categories', getCategories);

module.exports = router;
