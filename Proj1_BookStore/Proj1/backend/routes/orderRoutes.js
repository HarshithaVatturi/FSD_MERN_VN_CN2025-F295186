const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth } = require('../middlewares/authMiddleware');

// GET /order - Get orders with role-based filtering
router.get('/', auth, async (req, res) => {
    try {
        let query = {};

        // ADMIN: sees everything
        // SELLER: sees only orders for their books
        // USER: sees only their own orders

        if (req.user.role === 'admin') {
            // No filter or optional filters
            if (req.query.customerName) query.customerName = req.query.customerName;
            if (req.query.seller) query.seller = req.query.seller;
        } else if (req.user.role === 'seller') {
            query.seller = req.user._id;
        } else {
            query.user = req.user._id;
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /order - Place a new order (User action)
router.post('/', auth, async (req, res) => {
    try {
        const { bookId, bookTitle, price, address, seller } = req.body;
        const order = new Order({
            book: bookId,
            bookTitle,
            price,
            user: req.user._id, // Set from auth token
            customerName: req.user.name, // Set from auth token
            address,
            seller
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
