const express = require('express');
const router = express.Router();
const { getBreedData } = require('../api');

router.get('/breeds', async (req, res) => {
    try {
        const data = await getBreedData();
        console.log('Fetched breed data:', data); // Log the fetched data
        res.json(data);
    } catch (error) {
        console.error('Error fetching breed data:', error);
        res.status(500).json({ error: 'Failed to fetch breed data' });
    }
});

module.exports = router;
