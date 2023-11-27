const jwt = require('jsonwebtoken');
const config = require('./../config/config');

const getToken = (id) => {
    let payload = {id: id};
    let token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_LIFE
    });
    return token;
}

module.exports = {
    getToken
}