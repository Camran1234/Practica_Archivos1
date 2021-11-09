const keys = require('./keys');
const redis = require('redis');
var emailLogged = "public_Email";

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

module.exports.setLogin = (userEmail) =>{
    emailLogged = userEmail;
}

module.exports.existsUser = (userEmail) => {
    return new Promise((resolve, reject) => {
        redisClient.exists(userEmail, function (error, exist) {
            if (error) {
                reject(0);
            }
            else {
                resolve(exist);
            }
        });

        
    });
};

module.exports.exists = (userEmail, password) => {
    return new Promise((resolve, reject) => {
        
        redisClient.exists(userEmail, function (error, exist) {
            if (error) {
                reject(true);
            }
            else {
                let resultado =  redisClient.hget(userEmail, 'password');
                if(resultado != null){
                    if(resultado == password){
                        resolve(true)
                    }
                }
                resolve(false)
            }
        });

        
    });
};

module.exports.setUser = (userEmail, password, salt) => {
    return new Promise((resolve, reject) => {
        resolve(redisClient.hset(userEmail, 'password', password, 'salt', salt));
    });
};

function getOperation() {
    return new Promise((resolve, reject) => {
        redisClient.hget(emailLogged, function (error, exist) {
            if(error){
                reject(0);
            }else{
                resolve(exist);
            }
        });
    });
}

module.exports.uploadOperation = (operation) => {
    return new Promise ((resolve, reject) => {
        let array;
        redisClient.hget(emailLogged, function(error, exist) {
            if(error){
                reject(0);
            }else{
                array = exist;
            }
        });
        if(array == null){
            array = [];
        }
        array.push(operation);
        resolve(redisClient.hset(emailLogged, 'operation', array));
    })
}

module.exports.getUser = (userEmail) => {
    return new Promise((resolve, reject) => {
        redisClient.hgetall(userEmail, function (error, exist) {
            if (error) {
                reject(0);
            }
            else {
                resolve(exist);
            }
        });
    });
};

module.exports = {
    getOperation
}