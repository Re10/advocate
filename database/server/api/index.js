const router = require('express').Router();
const user = require('./user');
const admin = require('./admin');
const casemgt= require('./casemgt');
const court= require('./court');

router.use('/register', user.route);
router.use('/login', user.route);

router.use('/court',court.route);

router.use('/case',casemgt.route);

router.use('/advocatedetail', admin.route);

module.exports = router;