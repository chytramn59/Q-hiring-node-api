const express = require('express');

const router = express.Router();

const userquestionsControllers = require('../controllers/userquestions');

const isAuth = require('../middleware/is-Auth');

router.get('/getuserid/:id',isAuth,userquestionsControllers.getuserid);

router.post('/addall',isAuth,userquestionsControllers.addall);

module.exports = router;