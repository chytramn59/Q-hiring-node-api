const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const User = require('../models/user');

const { body } = require('express-validator/check');


router.post('/signup',[
    body('firstname').trim().not().isEmpty(),
    body('lastname').trim().not().isEmpty(),
    body('email').isEmail().withMessage('please enter valid email')
    .custom((value,{ req })=>{
        return User.findOne({email:value})
        .then(userDoc =>{
            if(userDoc){
            return Promise.reject('email is already exist')
        }
    })
    }).normalizeEmail(),
    body('college').trim().isLength({min:5}),
    body('branch').trim().not().isEmpty(),
    body('year').trim().not().isEmpty(),
    body('mobileno').trim().not().isEmpty(),
    body('batch').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('password').trim().not().isEmpty(),

],userController.singup);

router.post('/login',userController.login);

module.exports = router;