var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./emailController');

router.route('/')
    .post(controller.post)

module.exports = router;
