const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyRazorpayPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:id/razorpay').post(protect, createRazorpayOrder);
router.route('/:id/verify').post(protect, verifyRazorpayPayment);

module.exports = router;
