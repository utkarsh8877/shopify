const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getAnalytics = asyncHandler(async (req, res) => {
    const usersCount = await User.countDocuments({});
    const ordersCount = await Order.countDocuments({});
    const productsCount = await Product.countDocuments({});
    const orders = await Order.find({});
    
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

    res.json({
        usersCount,
        ordersCount,
        productsCount,
        totalRevenue
    });
});

module.exports = { getAnalytics };
