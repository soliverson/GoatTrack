const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController'); // Adjust if necessary

router.get('/goat-breeds', apiController.getGoatBreeds);
router.get('/goat-breeds/:breedName', apiController.getGoatBreed);

module.exports = router;
