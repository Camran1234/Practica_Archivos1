

function createConnection(port){
    const redis = require('redis');
    const client = redis.createClient({
        host: 'admin',
        port: 6379,
        password: 'admin'
    });

    client.on('error', err => {
        console.log('Error ' + err);
    });
}