var router = require('express').Router();

router.use('/users', require('./users/userRoutes'));
router.use('/skills', require('./skills/skillsRoutes'));
router.use('/experiences', require('./experience/experienceRoutes'));
router.use('/accomplishments', require('./accomplishments/accomplishmentsRoutes'));
router.use('/resume', require('./resume/resumeRoutes'));

module.exports = router;
