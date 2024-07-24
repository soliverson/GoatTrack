const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_URL = process.env.REACT_APP_USDA_API_URL;

router.get('/goat-data', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching goat data:', error);
        res.status(500).json({ error: 'Failed to fetch goat data' });
    }
});

module.exports = router;
