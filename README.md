# Shopify MERN Clone

A complete MERN stack e-commerce application based on the ShopNest architecture.

## Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- Razorpay / PayPal integration placeholder

## Environment Variables
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shopify
JWT_SECRET=secret
RAZORPAY_KEY_ID=test
RAZORPAY_KEY_SECRET=test
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
GMAIL_USER=demo
GMAIL_PASS=demo

## Install Dependencies
npm run build

## Run Application
npm run dev

## GitHub Repository
To clone or push:
```bash
git remote add origin https://github.com/utkarsh8877/shopify.git
git branch -M main
git push -u origin main
```

## Seed Database
npm run data:import
