const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/breeds', async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching goat breed data:', error);
        res.status(500).json({ error: 'Failed to fetch goat breed data' });
    }
});

module.exports = router;
