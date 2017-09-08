var router = require('express').Router();
var logger = require('../../util/logger');

// boilerplate
router.route('/')
    .get((req, res) => {
        logger.log('Hey from experience');
        res.send({ok: true});
    });

module.exports = router;
