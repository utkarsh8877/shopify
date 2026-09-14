const Razorpay = require('razorpay');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

const createRazorpayOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'test',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'test',
        });
        const options = {
            amount: order.totalPrice * 100, // amount in smallest currency unit
            currency: 'INR',
            receipt: `receipt_order_${order._id}`
        };
        const rz_order = await instance.orders.create(options);
        res.json(rz_order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test')
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'paid',
                update_time: Date.now().toString(),
                email_address: req.user.email,
            };
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } else {
        res.status(400);
        throw new Error('Invalid signature');
    }
});

module.exports = { createRazorpayOrder, verifyRazorpayPayment };
