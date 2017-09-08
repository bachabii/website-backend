var router = require('express').Router();

router.use('/users', require('./users/userRoutes'));
router.use('/resume', require('./resume/resumeRoutes'));

module.exports = router;
