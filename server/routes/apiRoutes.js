const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/goat-breeds', apiController.getGoatBreeds);

module.exports = router;
