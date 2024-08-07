const router = require('express').Router();
const { createToken, deleteToken, doUserLogin } = require('../../controllers/v1/token');

router.post('/create', createToken);
router.delete('/delete', deleteToken);
router.get('/', doUserLogin);

module.exports = router;
