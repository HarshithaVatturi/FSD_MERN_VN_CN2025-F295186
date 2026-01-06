const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { auth, requireRole } = require('../middlewares/authMiddleware');

// GET /item - Get all books (with optional seller filter) - PUBLIC
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.seller) {
            query.seller = req.query.seller;
        }
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }
        const books = await Book.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /item/:id - Get single book - PUBLIC
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /item - Add a book - SELLER ONLY
router.post('/', auth, requireRole('seller'), async (req, res) => {
    try {
        const { title, author, price, image, description, category } = req.body;
        const book = new Book({
            title,
            author,
            price,
            image,
            description,
            category,
            seller: req.user._id // Use authenticated user ID
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /item/:id/review - Add a review - AUTH REQUIRED
router.post('/:id/review', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const book = await Book.findById(req.params.id);

        if (book) {
            const review = {
                user: req.user.name, // Use authenticated user name
                rating,
                comment
            };
            book.reviews.push(review);
            await book.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /item/:id - Update a book - OWNER or ADMIN
router.put('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check ownership or admin role
        if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this book' });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /item/:id - Remove a book - OWNER or ADMIN
router.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check ownership or admin role
        if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this book' });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
