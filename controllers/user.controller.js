const { validationResult } = require('express-validator');
const { getUserByEmail, createUser, usersList } = require('../services/user');
const bcrypt = require('bcrypt');
const { getToken } = require('../services/jwt');

module.exports = {
    login: async (req, res, next) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(200).json({ success: 0, error: error.errors });
            }
            let { email, password } = req.body;
            let user = await getUserByEmail(email);
            // console.log(user);
            if(user && !await bcrypt.compare(password, user.password)) {
                return res.status(200).json({success: false, message: `Invalid credential`})
            } 
            res.status(200).json({
                success: true, 
                data: user, 
                token: getToken(user._id)
            })            
        } catch(err) {
            console.log(err);
            next(err);
        }
    },
    register: async (req, res, next) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(200).json({ success: 0, error: error.errors });
            }
            const { username, email, password } = req.body;
            encryptedPassword = await bcrypt.hash(password, 10);            
            let data = await createUser({     
                username: username,           
                email: email.toLowerCase(),
                password: encryptedPassword              
              });
            res.status(201).json({
                success: true,
                data,
                message: `Registerd successfully`,
                token: getToken(data._id)        
            })
        } catch(err) {
            next(err)
        }
    },
    userList: async (req, res, next) => {
        try {
            const result = await usersList(req.user.id);
            res.status(200).json({
                success: true,
                data: result
            })
        } catch(err) {
            next(err);
        }
    }
}