const router = require('express').Router();
const { createCategory } = require('../../controllers/v1/category');

router.post('/category', createCategory);

module.exports = router;
