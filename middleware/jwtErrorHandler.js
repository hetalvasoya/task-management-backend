const config = require('./../config/config');
const jwt = require('jsonwebtoken');

const jwtErrorHandler = (req, res, next) => {
    let payload;
    try{
        payload = jwt.verify(req.token, config.ACCESS_TOKEN_SECRET);
        console.log(payload);
     }
    catch(e){
        return res.status(401).send()
    }
}
module.exports = jwtErrorHandler;