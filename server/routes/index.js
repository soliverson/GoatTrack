const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const forumRoutes = require('./forumRoutes');
const goatRoutes = require('./goatRoutes');
const authRoutes = require('./authRoutes');

router.use('/api', apiRoutes);
router.use('/forum', forumRoutes);
router.use('/goats', goatRoutes);
router.use('/auth', authRoutes);

module.exports = router;
