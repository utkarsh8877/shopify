const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@shopnest.com',
                password: 'password123',
                isAdmin: true
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                isAdmin: false
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = [
            {
                name: 'Airpods Wireless Bluetooth Headphones',
                image: '/images/airpods.jpg',
                description: 'Bluetooth technology lets you connect it with compatible devices wirelessly',
                brand: 'Apple',
                category: 'Electronics',
                price: 89.99,
                countInStock: 10,
                rating: 4.5,
                numReviews: 12,
                user: adminUser,
            },
            {
                name: 'iPhone 13 Pro 256GB Memory',
                image: '/images/phone.jpg',
                description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system',
                brand: 'Apple',
                category: 'Electronics',
                price: 999.99,
                countInStock: 7,
                rating: 4.0,
                numReviews: 8,
                user: adminUser,
            }
        ];

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
