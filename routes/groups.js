const express = require('express');

const router = express.Router();

const groupControllers = require('../controllers/groups')

router.post('/creategroup',groupControllers.creategroup);

router.get('/getall',groupControllers.getall);

module.exports = router;