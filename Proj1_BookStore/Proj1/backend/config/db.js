const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Using a local mongodb connection string or one provided via env
        // For this environment, we'll try standard local port 27017
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/BookStore', {
            // These options are no longer needed in Mongoose 6+, but keeping for safety if older version
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
