const express = require('express');

const router = express.Router();

const questionsControllers = require('../controllers/questions');

const isAuth = require('../middleware/is-Auth');

router.get('/getAll',isAuth,questionsControllers.getAll);

router.post('/add',isAuth,questionsControllers.postQuestion);

module.exports = router;