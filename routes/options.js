const express = require('express');

const router = express.Router();

const optionsControllers = require('../controllers/options');

const isAuth = require('../middleware/is-Auth');

router.get('/getById/:_id',isAuth,optionsControllers.getById);

router.post('/add',isAuth,optionsControllers.add);

router.get('/getbyquestionid/:qid',isAuth,optionsControllers.getbyquestionid);

module.exports = router;