const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/goat-data', apiController.getGoatData);

module.exports = router;
