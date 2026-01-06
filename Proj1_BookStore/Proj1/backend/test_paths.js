const http = require('http');

const testPath = (path) => {
    const options = {
        hostname: 'localhost',
        port: 8000,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        console.log(`PATH: ${path} | STATUS: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`ERROR on ${path}: ${e.message}`);
    });

    req.write(JSON.stringify({}));
    req.end();
};

testPath('/auth/login');
testPath('/auth/register');
