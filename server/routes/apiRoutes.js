const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController'); // Corrected path to apiController

router.get('/breeds', apiController.getBreeds); // Example route

module.exports = router;
