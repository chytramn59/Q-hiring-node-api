const express = require('express');

const router = express.Router();

const questionsControllers = require('../controllers/questions');

router.get('/getAll',questionsControllers.getAll);

router.post('/add',questionsControllers.postQuestion);

module.exports = router;