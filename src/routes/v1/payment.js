const router = require('express').Router();
const {
  createPayment,
  successPayment,
  failPayment,
  cancelPayment,
} = require('../../controllers/v1/payment');

router.post('/create-payment', createPayment);
router.post('/success-payment', successPayment);
router.post('/fail-payment', failPayment);
router.post('/cancel-payment', cancelPayment);

module.exports = router;
