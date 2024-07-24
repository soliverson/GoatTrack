const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_NINJAS_KEY = process.env.API_NINJAS_KEY;

router.get('/goat-breeds', async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=goat', {
            headers: { 'X-Api-Key': API_NINJAS_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching breed information:', error);
        res.status(500).json({ message: 'Error fetching breed information', error });
    }
});

module.exports = router;
