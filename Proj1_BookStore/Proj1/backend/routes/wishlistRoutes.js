const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { auth } = require('../middlewares/authMiddleware');

// GET /wishlist - Get current user's wishlist
router.get('/', auth, async (req, res) => {
    try {
        const items = await Wishlist.find({ user: req.user._id }).populate('book');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /wishlist - Add item to wishlist
router.post('/', auth, async (req, res) => {
    try {
        const { bookId } = req.body;
        const exists = await Wishlist.findOne({ user: req.user._id, book: bookId });
        if (exists) return res.status(400).json({ message: 'Already in wishlist' });

        const item = new Wishlist({ user: req.user._id, book: bookId });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /wishlist/:id - Remove from wishlist
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Wishlist.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
