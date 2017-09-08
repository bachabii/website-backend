var router = require('express').Router();
var logger = require('../../util/logger');

// boilerplate
router.route('/')
    .get((req, res, next) => {
        logger.log('Hey from users');
        return next(new Error('messed up'));
        res.send({ok: true});
    });

module.exports = router;
