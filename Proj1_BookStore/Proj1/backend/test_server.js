const axios = require('axios');

const testServer = async () => {
    try {
        const res = await axios.get('http://localhost:8000/');
        console.log('ROOT:', res.data);

        // Try login path with GET (should 404 since it's POST, but it confirms path existence vs server existence)
        try {
            await axios.get('http://localhost:8000/auth/login');
        } catch (e) {
            console.log('AUTH_LOGIN_STATUS:', e.response?.status);
        }
    } catch (e) {
        console.error('SERVER_ERROR:', e.message);
    }
};

testServer();
