const { ObjectId } = require('mongodb');
const axios = require('axios');
const { getFoodByIds } = require('../../services/v1/food');
const { createNewOrder } = require('../../services/v1/order');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

const createPayment = async (req, res, next) => {
  const { amount, productName, categories, user, userId, foodsItems, deliveryFee } = req.body;
  try {
    if (!amount || amount <= 0 || !productName || !categories || !user || !user.address) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request',
      });
    }
    // create order instance
    const food = await getFoodByIds(foodsItems);
    if (!food || food.length === 0) {
      return res.status(400).json({ status: 400, error: 'Bad request: Invalid input data.' });
    }
    const foodItem = foodsItems.map((fItem) => {
      const foodData = food.find((f) => f.id === fItem.foodId);
      return {
        name: foodData.name,
        price: foodData.price,
        quantity: fItem.quantity,
        discount: foodData.discount,
      };
    });
    const total = foodItem.reduce((acc, curr) => {
      if (curr.discount !== 0 || curr.discount < 0) {
        return acc + (curr.price - (curr.price * curr.discount) / 100) * curr.quantity;
      }
      return acc + curr.price * curr.quantity;
    }, 0);
    const transactionId = new ObjectId().toString();
    const order = await createNewOrder({
      userId,
      foodItem,
      total: total + deliveryFee,
      transactionId,
    });
    const paymentData = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASSWD,
      total_amount: amount,
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.API_BASE_URL}/api/v1/payment/success-payment`,
      fail_url: `${process.env.API_BASE_URL}/api/v1/payment/fail-payment`,
      cancel_url: `${process.env.API_BASE_URL}/api/v1/payment/cancel-payment`,
      ipn_url: 'http://yourwebsite.com/ipn',
      shipping_method: 'NO',
      product_name: productName,
      product_category: categories,
      product_profile: 'general',
      value_a: user._id,
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: user.address.place,
      cus_city: user.address.city,
      cus_postcode: user.address.zip,
      cus_country: user.address.country,
      cus_phone: user.phone,
    };
    const response = await axios({
      method: 'post',
      url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      data: paymentData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (order) {
      res.status(200).json({
        status: 200,
        paymentUrl: response.data.GatewayPageURL,
      });
    }
  } catch (error) {
    next(error);
  }
};

const successPayment = async (req, res, next) => {
  try {
    const successData = req.body;
    const userId = successData.value_a;
    if (successData.status !== 'VALID') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    // update order status
    const order = await Order.findOneAndUpdate(
      {
        transactionId: successData.tran_id,
      },
      {
        isPaid: true,
      },
    );
    await Cart.deleteMany({ userId });
    if (order) {
      res.redirect(`${process.env.FRONTEND_URL}/success`);
    }
  } catch (error) {
    next(error);
  }
};

const failPayment = async (req, res, next) => {
  try {
    const failData = req.body;
    if (failData.status !== 'FAILED') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    const order = await Order.findOneAndDelete({
      transactionId: failData.tran_id,
    });
    if (order) {
      res.redirect(`${process.env.FRONTEND_URL}/fail`);
    }
  } catch (error) {
    next(error);
  }
};

const cancelPayment = async (req, res, next) => {
  try {
    const cancelData = req.body;
    if (cancelData.status !== 'CANCELLED') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid request, payment failed',
      });
    }
    const order = await Order.findOneAndDelete({
      transactionId: cancelData.tran_id,
    });
    if (order) {
      res.redirect(`${process.env.FRONTEND_URL}/cancel`);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
