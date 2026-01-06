const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/item', bookRoutes);
app.use('/order', require('./routes/orderRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/wishlist', require('./routes/wishlistRoutes'));

// Root route for simple check
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
