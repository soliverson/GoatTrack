const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/breeds', apiController.getBreedInformation);

module.exports = router;
