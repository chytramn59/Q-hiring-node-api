const express = require('express');

const router = express.Router();

const userquestionsControllers = require('../controllers/userquestions');

const isAuth = require('../middleware/is-Auth');

router.get('/getuserid/:id',userquestionsControllers.getuserid);

router.post('/addall',userquestionsControllers.addall);

module.exports = router;