const router = require('express').Router();
const { createPayment } = require('../../controllers/v1/payment');

router.post('/create-payment', createPayment);

module.exports = router;
