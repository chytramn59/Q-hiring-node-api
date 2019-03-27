const express = require('express');

const router = express.Router();

const optionsControllers = require('../controllers/options');

const isAuth = require('../middleware/is-Auth');

router.get('/getById/:_id',optionsControllers.getById);

router.post('/add',optionsControllers.add);

router.get('/getbyquestionid/:qid',optionsControllers.getbyquestionid);

module.exports = router;