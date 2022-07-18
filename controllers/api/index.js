const router = require('express').Router();
const userRoutes = require('./user-routes');
const friendsRoutes = require('./friends-routes');

router.use('/users', userRoutes);
router.use('/users', friendsRoutes);

module.exports = router;