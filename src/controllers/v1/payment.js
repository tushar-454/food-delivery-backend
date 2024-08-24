const { ObjectId } = require('mongodb');
const axios = require('axios');
const { getFoodByIds } = require('../../services/v1/food');
const { createNewOrder } = require('../../services/v1/order');

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
      success_url: `${process.env.API_BASE_URL}/success`,
      fail_url: `${process.env.API_BASE_URL}/fail`,
      cancel_url: `${process.env.API_BASE_URL}/cancel`,
      ipn_url: 'http://yourwebsite.com/ipn',
      shipping_method: 'NO',
      product_name: productName,
      product_category: categories,
      product_profile: 'general',
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

module.exports = {
  createPayment,
};
