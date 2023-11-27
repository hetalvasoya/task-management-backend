const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const { UserModel } = require('../models');

const validateToken = async (req, res, next) => {
    try{           
        const authorization = req.headers.authorization;
        let payload = {};   
        if(!authorization || Object.keys(authorization).length === 0) {
            return res.status(401).send()
        }
        if(authorization.startsWith('Bearer')) {
            const token = authorization.split("Bearer ")[1];
            payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);            
        } else {
            const token = authorization;
            payload = jwt.verify(token, config.ACCESS_TOKEN_SECRET);           
        }
        if((payload.exp * 1000) < new Date().getTime()) {
            return next(new Error(`Session expiry.`, 401))
        } 
        req.user = await UserModel.findOne({_id: payload.id});
        next();
    }
    catch(e) {
        console.trace();
        next(new Error(e.message, 401))
    }
}

module.exports = validateToken