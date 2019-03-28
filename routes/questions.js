const express = require('express');

const router = express.Router();

const questionsControllers = require('../controllers/questions');

const isAuth = require('../middleware/is-Auth');

router.get('/getAll',isAuth,questionsControllers.getAll);

router.get('/getAllwithoptions',isAuth,questionsControllers.getAllwithoptions);

router.post('/add',isAuth,questionsControllers.postQuestion);

router.get('/getquestionById/:_id',questionsControllers.getquestionById);

module.exports = router;