const router = require('express').Router();
const { check } = require('express-validator');

const { getUserByEmail } = require('../services/user');
const validateToken = require('../middleware/validateToken');

const { login, register, userList } = require('../controllers/index').UserController;

router.route('/login').post([
        check('email').trim().not().isEmpty().withMessage(`Please provide email`)
                    .bail()
                    .isEmail().withMessage(`Not an email`)
                    .custom(async(email) => {
                        let user = await getUserByEmail(email);
                        if(!user) 
                            throw new Error(`Email not found`)
                    }),
        check('password').not().isEmpty().withMessage(`Please provide password`)
            .bail()
            .isLength({min: 8}).withMessage(`Must be at least 8 chars long`)
        ], login)

router.route('/register').post([
        check('username').trim().not().isEmpty().withMessage(`Please provide user name`),
        check('email').trim().not().isEmpty().withMessage(`Please provide email`)
        .bail()
        .isEmail().withMessage(`Not an email`)
        .custom(async(email) => {
            let user = await getUserByEmail(email);
            if(user) 
                throw new Error(`Email already exist`)
        }),
        check('password').not().isEmpty().withMessage(`Please provide password`)
        .bail()
        .isLength({min: 8}).withMessage(`Must be at least 8 chars long`)
        ], register);

router.route('/userList').get(validateToken, userList)

module.exports = router;