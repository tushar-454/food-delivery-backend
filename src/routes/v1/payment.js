const router = require('express').Router();
const { createPayment, successPayment } = require('../../controllers/v1/payment');

router.post('/create-payment', createPayment);
router.post('/success-payment', successPayment);

module.exports = router;
