const User = require('./models/User');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const test = async () => {
    await connectDB();
    try {
        const users = await User.find({});
        console.log('USER_COUNT:' + users.length);
        console.log('USERS:', users.map(u => u.email));
    } catch (e) {
        console.error(e);
    }
    process.exit();
};

test();
