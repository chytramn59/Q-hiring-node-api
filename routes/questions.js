const express = require('express');

const router = express.Router();

const questionsControllers = require('../controllers/questions');

const isAuth = require('../middleware/is-Auth');

router.get('/getAll',isAuth,questionsControllers.getAll);

router.get('/getAllwithoptions',isAuth,questionsControllers.getAllwithoptions);

router.post('/add',questionsControllers.postQuestion);


router.post('/addq',questionsControllers.postQuestionwithoptions);

router.get('/getquestionById/:_id',isAuth,questionsControllers.getquestionById);

module.exports = router;