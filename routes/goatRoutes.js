const express = require('express');
const router = express.Router();
const goatController = require('../controllers/goatController');

// Define routes for managing goats
router.post('/', goatController.createGoat);
router.get('/', goatController.getGoats);

module.exports = router;
