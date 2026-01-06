const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, requireRole } = require('../middlewares/authMiddleware');

// All routes here are admin-only
router.use(auth, requireRole('admin'));

// GET /user - Get all users (Admin view)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /user/stats - Get platform stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalSellers = await User.countDocuments({ role: 'seller' });
        // Return stats
        res.json({ totalUsers, totalSellers });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /user/:id - Remove a user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /user/:id/role - Change user role
router.put('/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = role;
            await user.save();
            res.json({ message: 'Role updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
