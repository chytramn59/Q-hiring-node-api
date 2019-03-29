const { validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.singup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        // const error = new Error('valdation failed entered wrong data');
        // error.statusCode = 422;
        // throw error;
        return res.status(422).json({ errors: errors.array() });
    }

    // const { firstname,  } = req.body;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const college = req.body.college;
    const branch = req.body.branch;
    const year = req.body.year;
    const mobileno = req.body.mobileno;
    const batch = req.body.batch;
    const city = req.body.city;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                email: email,
                college: college,
                branch: branch,
                year: year,
                mobileno: mobileno,
                batch: batch,
                city: city,
                password: hashedPw
            })
            return user.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'user created',
                        userId: result._id
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                })
        });
}

exports.login = (req,res,next) =>{
    const mobileno = req.body.mobileno;
    const password = req.body.password;
    let loadedUser;
    User.findOne({mobileno: mobileno})
    .then(user =>{
        if(!user){
           const error = new Error('A user with this email could not be found.');
           error.statusCode = 401;
           throw error;
        }
        loadedUser = user;
       return bcrypt.compare(password,user.password);
    })
    .then(isEqual =>{
        if(!isEqual){
          const error = new Error('wrong password.');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId:loadedUser._id.toString()
            },
            'secret',
            {expiresIn : '5h'}
        )
        res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })

    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
       
      });
   
}